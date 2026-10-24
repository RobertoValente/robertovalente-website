<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Secrets

- Never open, read, print, copy or search `.env.prod`. It holds production values and is for Roberto only.
- Never open `.env` or other `.env*` files unless the task needs a local value. Never print their values in output, logs, commits or messages.
- To check which variables exist, search the code for `process.env`, not the files.
- When a task needs a production value, ask Roberto to run the command instead.
