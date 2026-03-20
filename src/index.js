// Cloudflare Worker: Password protection for /members/*

const COOKIE_NAME = 'members_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function loginPage(error) {
  const errorHtml = error
    ? '<p style="color:#af000d;font-size:14px;margin-bottom:16px;">パスワードが正しくありません。</p>'
    : '';

  return new Response(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>会員専用 | 福岡中央ライオンズクラブ</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<style>body{font-family:'Noto Sans JP',sans-serif;}</style>
</head>
<body class="bg-[#fbf9f8] min-h-screen flex items-center justify-center px-6">
<div class="w-full max-w-sm">
<div class="text-center mb-8">
<div class="w-16 h-16 mx-auto rounded-full bg-[#1d5fa8]/10 flex items-center justify-center mb-4">
<span class="material-symbols-outlined" style="font-size:32px;color:#1d5fa8;">lock</span>
</div>
<h1 class="text-xl font-bold text-[#1b1c1c] mb-1">会員専用ページ</h1>
<p class="text-sm text-[#1b1c1c]/60">パスワードを入力してください</p>
</div>
${errorHtml}
<form method="POST" class="space-y-4">
<input type="password" name="password" placeholder="パスワード" required autofocus
  class="w-full px-5 py-3 rounded-xl bg-white border border-[#e7bdb7]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d5fa8]/30 focus:border-[#1d5fa8]"/>
<button type="submit"
  class="w-full py-3 bg-[#1d5fa8] text-white font-bold text-sm rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all">
  ログイン
</button>
</form>
<div class="text-center mt-6">
<a href="/" class="text-xs text-[#1b1c1c]/50 hover:text-[#af000d] transition-colors">← トップページに戻る</a>
</div>
</div>
</body>
</html>`, {
    status: error ? 401 : 200,
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isMembers = url.pathname.startsWith('/members');

    // If not /members, serve static assets directly
    if (!isMembers) {
      return env.ASSETS.fetch(request);
    }

    const password = env.MEMBER_PASSWORD;

    // If no password configured, serve directly
    if (!password) {
      return env.ASSETS.fetch(request);
    }

    const secret = 'fukuoka-chuo-lions-salt';

    // Check for valid auth cookie
    const cookieHeader = request.headers.get('Cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [k, ...v] = c.trim().split('=');
        return [k, v.join('=')];
      })
    );

    if (cookies[COOKIE_NAME]) {
      const expected = await hashPassword(password, secret);
      if (cookies[COOKIE_NAME] === expected) {
        return env.ASSETS.fetch(request);
      }
    }

    // Handle POST (login attempt)
    if (request.method === 'POST') {
      const formData = await request.formData();
      const submitted = formData.get('password');

      if (submitted === password) {
        const token = await hashPassword(password, secret);
        return new Response(null, {
          status: 302,
          headers: {
            'Location': url.pathname,
            'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/members; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`,
          },
        });
      }

      return loginPage(true);
    }

    // Show login form
    return loginPage(false);
  },
};
