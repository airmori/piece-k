interface Env {
  MEMBER_PASSWORD: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { password } = await context.request.json<{ password: string }>();

  if (password === context.env.MEMBER_PASSWORD) {
    const response = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    response.headers.set(
      "Set-Cookie",
      `member_auth=1; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
    );
    return response;
  }

  return new Response(JSON.stringify({ ok: false }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
};
