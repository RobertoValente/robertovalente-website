// Shared by the client form and the server action.

export type MessageErrors = Partial<Record<"name" | "email" | "message", "name" | "email" | "emailInvalid" | "message">>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 200;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

export function parseMessage(data: FormData) {
  const name = String(data.get("name") ?? "").trim().slice(0, MAX_TEXT);
  const email = String(data.get("email") ?? "").trim().slice(0, MAX_TEXT);
  const message = String(data.get("message") ?? "").trim().slice(0, MAX_MESSAGE);
  const errors: MessageErrors = {};

  if (!name) errors.name = "name";
  if (!email) errors.email = "email";
  else if (!EMAIL_RE.test(email)) errors.email = "emailInvalid";
  if (message.length < MIN_MESSAGE) errors.message = "message";

  return { input: { name, email, message }, errors };
}
