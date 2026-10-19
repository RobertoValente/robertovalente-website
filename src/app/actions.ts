"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { createMessage, recordAttempt } from "@/lib/db";
import { hasLocale } from "@/lib/i18n";
import { parseMessage, type MessageErrors } from "@/lib/message";

const NOTIFY_TO = "robertovalente@valey.pt";
const RATE_LIMIT = { attempts: 3, windowMinutes: 60 };

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

  // Email first, then save. Both must succeed.
  try {
    const attempts = await recordAttempt(hashIp(await clientIp()), RATE_LIMIT.windowMinutes);
    if (attempts > RATE_LIMIT.attempts) return { status: "error", error: "rateLimit" };

    const message = { ...input, lang: hasLocale(lang) ? lang : "pt" };
    await notify(message);
    await createMessage(message);
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return { status: "error", error: "failed" };
  }

  return { status: "sent" };
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

// IPs are only stored hashed. The Resend key is a server-only secret, so it doubles as the HMAC key.
function hashIp(ip: string) {
  return createHmac("sha256", process.env.RESEND_API_KEY!).update(`ip:${ip}`).digest("hex");
}

async function notify(message: { name: string; email: string; message: string; lang: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: NOTIFY_TO,
    replyTo: message.email,
    subject: `New message from ${message.name} (robertovalente.pt)`,
    text: [`Name: ${message.name}`, `Email: ${message.email}`, `Language: ${message.lang}`, "", message.message].join(
      "\n",
    ),
  });
  if (error) throw new Error(error.message);
}
