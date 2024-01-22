import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request }) => {
  const payload = await request.json();
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/auth/local`,
    opts
  );
  const data = await res.json();
  if (data.jwt) {
    cookies.set("_token", data.jwt, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * (24 * 60), // 60 days
    });
  }
  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
