import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
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
    `${import.meta.env.PUBLIC_API_URL}/api/auth/reset-password`,
    opts
  );
  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
