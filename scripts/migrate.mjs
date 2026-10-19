// Applies db/schema.sql to DATABASE_URL. Run with `npm run db:migrate`.
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

await sql.unsafe(schema);
await sql.end();
console.log("Schema applied.");
