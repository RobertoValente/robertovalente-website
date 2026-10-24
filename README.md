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
npm run dev
```

The contact form needs rv-api running (locally on port 8000).

## Environment

| Variable | Purpose |
| --- | --- |
| `RV_API_URL` | Base URL of [rv-api](https://github.com/RobertoValente/rv-api), which saves the submissions and sends the emails |
| `RV_API_KEY` | This site's rv-api key (server-only) |
