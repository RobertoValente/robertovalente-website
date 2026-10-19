# robertovalente.pt

Personal website of [Roberto Valente](https://robertovalente.pt): portfolio, blog and contact, in Portuguese and English.

## Writing a post

Posts are Markdown files, one per language, in `content/blog/<lang>/<slug>.md`:

```md
---
title: Post title
description: One or two sentences, used in the list, search results and RSS.
date: 2026-10-19
---

Post body in Markdown.
```

- The file name is the URL: `content/blog/pt/novo-site.md` is `/pt/blog/novo-site`.
- Use the same file name in `pt/` and `en/` for a translation. The two versions link to each other.
- A post can exist in only one language.
- Commit and deploy. Sitemap, RSS (`/<lang>/blog/rss.xml`) and `llms.txt` update on their own.

## Development

```bash
npm install
npm run db:migrate   # creates the tables in DATABASE_URL
npm run dev
```

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (password percent-encoded) |
| `RESEND_API_KEY` | Resend API key, for contact notifications |
| `EMAIL_FROM` | Sender address, on a domain verified in Resend |

`npm run build` applies the schema before building. The Docker image applies it on start.
