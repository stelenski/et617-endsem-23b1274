// Label Lens — server function that talks to Groq (free tier, no card needed).
// Your key stays here on the server: set GROQ_API_KEY in Vercel. The browser never sees it.

const VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';   // reads label photos
const TEXT_MODEL = process.env.GROQ_TEXT_MODEL || 'openai/gpt-oss-120b';     // analysis, chat, scoring
const MAX_MESSAGES = 40;
const MAX_TEXT = 40_000;          // characters per message
const MAX_IMAGES = 2;             // keeps a scan inside the free tier's tokens-per-minute
const MAX_IMAGE_B64 = 2_500_000;  // ~1.8 MB per image

const fail = (status, message) => new Response(message, { status, headers: { 'content-type': 'text/plain' } });
const stripThink = t => String(t || '').replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function callGroq(key, payload, signal) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
    // Free tier: if we hit the per-minute limit and Groq says to wait briefly, wait once and retry.
    if (res.status === 429 && attempt === 0) {
      const wait = parseFloat(res.headers.get('retry-after') || '');
      if (wait > 0 && wait <= 20) { await sleep(wait * 1000 + 250); continue; }
    }
    return res;
  }
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return fail(405, 'Method not allowed');

    const key = process.env.GROQ_API_KEY;
    if (!key) return fail(500, 'The server is missing GROQ_API_KEY.');

    // Only accept calls from pages on this same site.
    const origin = request.headers.get('origin');
    if (origin) {
      try { if (new URL(origin).host !== request.headers.get('host')) return fail(403, 'Forbidden'); }
      catch { return fail(403, 'Forbidden'); }
    }

    let body;
    try { body = await request.json(); } catch { return fail(400, 'Invalid JSON'); }
    const { messages, images = [], tier = 'default', stream = false } = body || {};

    if (!Array.isArray(messages) || !messages.length || messages.length > MAX_MESSAGES) return fail(400, 'Bad messages');
    for (const m of messages) {
      if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string' || m.content.length > MAX_TEXT) {
        return fail(400, 'Bad message');
      }
    }
    if (messages[messages.length - 1].role !== 'user') return fail(400, 'Last message must be from the user');
    if (!Array.isArray(images) || images.length > MAX_IMAGES || images.some(d => typeof d !== 'string' || d.length > MAX_IMAGE_B64)) {
      return fail(400, 'Bad images');
    }

    const msgs = messages.map(m => ({ role: m.role, content: m.content }));
    const vision = images.length > 0;
    if (vision) {
      const last = msgs[msgs.length - 1];
      last.content = [
        { type: 'text', text: last.content },
        ...images.map(data => ({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${data}` } })),
      ];
    }

    const model = vision ? VISION_MODEL : TEXT_MODEL;
    const payload = {
      model,
      messages: msgs,
      temperature: vision || tier === 'complex' ? 0.1 : 0.4,
      max_completion_tokens: vision ? 1800 : 1500,
      stream: !!stream,
    };
    if (model.startsWith('openai/gpt-oss')) payload.reasoning_effort = 'low';

    let upstream;
    try { upstream = await callGroq(key, payload, request.signal); }
    catch { return fail(502, 'Could not reach Groq.'); }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('Groq API error', upstream.status, detail);
      return fail(upstream.status === 429 ? 429 : 502, upstream.status === 429 ? 'Free-tier limit reached. Wait a minute and try again.' : 'The AI service returned an error.');
    }

    if (stream) {
      return new Response(upstream.body, {
        headers: { 'content-type': 'text/event-stream', 'cache-control': 'no-cache, no-transform' },
      });
    }
    const json = await upstream.json();
    const choice = (json.choices || [])[0] || {};
    return Response.json({ text: stripThink(choice.message && choice.message.content), stop_reason: choice.finish_reason });
  },
};
