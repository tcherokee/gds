import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request }) => {
  const payload = await request.json();
  const body = {
    data: {
      ...payload,
    },
  };

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/sport-reviews`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
