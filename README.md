# Label Lens (et617-23b1274)

A mobile-first app that reads nutrition-label photos, rebuilds the table, analyses the product, answers questions, and keeps an evaluation log of how well you understood each product.

Live at: https://et617-23b1274.vercel.app (once deployed with the project name `et617-23b1274`)

## Files

- `index.html`: the whole app (no build step)
- `api/ai.js`: a Vercel Function that calls Groq with your key
- `vercel.json`: gives that function up to 60 s

## Environment variables (set in Vercel)

| Name | Required | What it does |
| --- | --- | --- |
| `GROQ_API_KEY` | yes | Your free Groq API key (console.groq.com → API Keys) |
| `GROQ_VISION_MODEL` | no | Model that reads label photos (default `qwen/qwen3.8-27b`) |
| `GROQ_TEXT_MODEL` | no | Model for analysis, chat and scoring (default `openai/gpt-oss-120b`) |

## Deploy

1. Push this folder to a GitHub repo.
2. In Vercel: Add New → Project → import the repo. **Project Name: `et617-23b1274`**. Framework preset: **Other**. Leave the build settings empty.
3. Add `GROQ_API_KEY` under Environment Variables, then Deploy.

Or from a terminal inside this folder: `npm i -g vercel`, then `vercel` (name the project `et617-23b1274`), then `vercel env add GROQ_API_KEY production`, then `vercel --prod`.

## Free-tier notes

- Up to 2 photos per label (keeps a scan inside Groq's free per-minute token limit).
- If several people use it at once, they may see "wait a minute and try again". The server waits and retries once by itself.
- Chats, the evaluation log and your details are saved in each visitor's browser.
