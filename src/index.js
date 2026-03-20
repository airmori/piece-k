// Cloudflare Worker: Password protection for /members/dashboard and /members/documents/*

const COOKIE_NAME = 'members_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const SECRET = 'fukuoka-chuo-lions-salt';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(SECRET + password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

function isProtectedPath(pathname) {
  return pathname.startsWith('/members/dashboard') || pathname.startsWith('/members/documents');
}

function unauthorizedResponse() {
  return new Response('Unauthorized', {
    status: 302,
    headers: { 'Location': '/members/' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const password = env.MEMBER_PASSWORD;

    // Handle POST to /api/members/login (login attempt)
    if (url.pathname === '/api/members/login' && request.method === 'POST') {
      if (!password) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      let submitted = '';
      try {
        const body = await request.json();
        submitted = body.password || '';
      } catch (e) {
        // ignore parse error
      }

      if (submitted === password) {
        const token = await hashPassword(password);
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/members; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`,
          },
        });
      }

      return new Response(JSON.stringify({ ok: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Protected paths: check auth cookie
    if (isProtectedPath(url.pathname) && password) {
      const cookieHeader = request.headers.get('Cookie') || '';
      const match = cookieHeader.match(new RegExp(COOKIE_NAME + '=([^;]+)'));
      const token = match ? match[1] : '';

      if (token) {
        const expected = await hashPassword(password);
        if (token === expected) {
          return env.ASSETS.fetch(request);
        }
      }

      return unauthorizedResponse();
    }

    // All other requests: serve static assets
    return env.ASSETS.fetch(request);
  },
};
