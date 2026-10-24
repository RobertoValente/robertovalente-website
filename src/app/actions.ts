"use server";

import { hasLocale } from "@/lib/i18n";
import { parseMessage, type MessageErrors } from "@/lib/message";
import { rvApi } from "@/lib/rv-api";

export type ContactState = {
  status: "idle" | "sent" | "error";
  errors?: MessageErrors;
  error?: "rateLimit" | "failed";
};

export async function sendMessage(_prev: ContactState, data: FormData): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  if (String(data.get("website") ?? "")) return { status: "sent" };

  const lang = String(data.get("lang") ?? "");
  const { input, errors } = parseMessage(data);
  if (Object.keys(errors).length > 0) return { status: "idle", errors };

  // rv-api rate limits, saves the message and emails it.
  try {
    const message = { ...input, lang: hasLocale(lang) ? lang : "pt" };
    const { status, code } = await rvApi("/website/messages", { method: "POST", body: message, forwardIp: true });
    if (!status && code === "RATE_LIMITED") return { status: "error", error: "rateLimit" };
    if (!status) throw new Error(code);
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return { status: "error", error: "failed" };
  }

  return { status: "sent" };
}
