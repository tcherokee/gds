import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/users/me`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data));
};

export const PATCH: APIRoute = async ({ cookies, request }) => {
  const payload = await request.json();
  const opts = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
    body: JSON.stringify({ data: payload }),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/user/me/update`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
