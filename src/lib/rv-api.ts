import "server-only";
import { headers } from "next/headers";

// rv-api owns this site's tables and sends its emails. Every answer has the same envelope.
export type RvApiResponse<T = unknown> = { status: boolean; code: string; data: T };

type Options = { method?: "GET" | "POST"; body?: unknown; forwardIp?: boolean };

/** Calls rv-api from the server. Throws on network errors and timeouts; error codes come back as `status: false`. */
export async function rvApi<T = unknown>(path: string, { method = "GET", body, forwardIp }: Options = {}) {
  const requestHeaders: Record<string, string> = { "X-API-Key": process.env.RV_API_KEY! };
  if (body !== undefined) requestHeaders["Content-Type"] = "application/json";
  // The API sees the server's IP, so the visitor's goes along for rate limiting.
  if (forwardIp) requestHeaders["X-Client-IP"] = await clientIp();

  const response = await fetch(`${process.env.RV_API_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  });
  return (await response.json()) as RvApiResponse<T>;
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
