export const onRequest: PagesFunction = async (context) => {
  const cookie = context.request.headers.get("Cookie") || "";
  const hasAuth = cookie.split(";").some((c) => c.trim().startsWith("member_auth="));

  if (!hasAuth) {
    return Response.redirect(new URL("/members/", context.request.url), 302);
  }

  return context.next();
};
