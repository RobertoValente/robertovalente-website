import "server-only";
import postgres from "postgres";

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

// Reuse one connection pool across hot reloads in dev.
export const sql = globalForDb.sql ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export type MessageInput = { name: string; email: string; message: string; lang: string };

export async function createMessage(input: MessageInput) {
  await sql`
    INSERT INTO messages (name, email, message, lang)
    VALUES (${input.name}, ${input.email}, ${input.message}, ${input.lang})
  `;
}

// Records an attempt and returns how many attempts this IP made inside the window.
export async function recordAttempt(ipHash: string, windowMinutes: number) {
  await sql`DELETE FROM contact_attempts WHERE created_at < now() - interval '1 day'`;
  await sql`INSERT INTO contact_attempts (ip_hash) VALUES (${ipHash})`;
  const [{ count }] = await sql<{ count: number }[]>`
    SELECT count(*)::int AS count FROM contact_attempts
    WHERE ip_hash = ${ipHash} AND created_at > now() - make_interval(mins => ${windowMinutes})
  `;
  return count;
}
