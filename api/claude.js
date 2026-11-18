// Label Lens — server function that talks to the Claude API.
// Your API key stays here on the server (set ANTHROPIC_API_KEY in Vercel); the browser never sees it.

const MODELS = {
  quick: process.env.MODEL_QUICK || 'claude-haiku-5-5',
  default: process.env.MODEL_DEFAULT || 'claude-sonnet-5-5',
  complex: process.env.MODEL_COMPLEX || 'claude-sonnet-5-5', // used for reading label photos
};
const MAX_MESSAGES = 40;
const MAX_TEXT = 60_000;      // characters per message
const MAX_IMAGES = 4;
const MAX_IMAGE_B64 = 1_400_000; // ~1 MB per image after base64

const fail = (status, message) => new Response(message, { status, headers: { 'content-type': 'text/plain' } });

export default {
  async fetch(request) {
    if (request.method !== 'POST') return fail(405, 'Method not allowed');

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return fail(500, 'The server is missing ANTHROPIC_API_KEY.');

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
    if (images.length) {
      const last = msgs[msgs.length - 1];
      last.content = [
        ...images.map(data => ({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data } })),
        { type: 'text', text: last.content },
      ];
    }

    let upstream;
    try {
      upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({
          model: MODELS[tier] || MODELS.default,
          max_tokens: tier === 'complex' ? 4096 : 1500,
          messages: msgs,
          stream: !!stream,
        }),
        signal: request.signal,
      });
    } catch {
      return fail(502, 'Could not reach the Claude API.');
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('Claude API error', upstream.status, detail);
      return fail(upstream.status === 429 || upstream.status === 529 ? 429 : 502, 'The Claude API returned an error.');
    }

    if (stream) {
      return new Response(upstream.body, {
        headers: { 'content-type': 'text/event-stream', 'cache-control': 'no-cache, no-transform' },
      });
    }
    const json = await upstream.json();
    const text = (json.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    return Response.json({ text, stop_reason: json.stop_reason });
  },
};
