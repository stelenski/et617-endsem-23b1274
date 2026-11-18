# Label Lens

A mobile-first app that reads nutrition-label photos, rebuilds the table, analyses the product, and answers questions about it.

## Files

- `index.html` — the whole app (no build step)
- `api/claude.js` — a Vercel Function that calls the Claude API with your key
- `vercel.json` — gives that function up to 60 s (reading photos can take 20–40 s)

## Environment variables (set in Vercel)

| Name | Required | What it does |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | Your Claude API key |
| `MODEL_DEFAULT` | no | Model for analysis, chat and scoring (default `claude-sonnet-5-5`) |
| `MODEL_COMPLEX` | no | Model for reading label photos (default `claude-sonnet-5-5`; try `claude-opus-5-5` for the hardest labels) |
| `MODEL_QUICK` | no | Spare fast model (default `claude-haiku-5-5`) |

## Deploy

1. Push this folder to a GitHub repo.
2. In Vercel: Add New → Project → import the repo. Framework preset: **Other**. Leave the build settings empty.
3. Add `ANTHROPIC_API_KEY` under Environment Variables, then Deploy.

Or from a terminal: `npm i -g vercel`, then `vercel`, then `vercel env add ANTHROPIC_API_KEY production`, then `vercel --prod`.

## Notes

- Anyone with the link can use your API credits. Set a monthly spend limit in the Claude Console, and turn on Vercel Deployment Protection if the app is just for you.
- Chats, the evaluation log and your details are saved in each visitor's browser (localStorage).
- Read-aloud and voice input use the browser's built-in speech features.
