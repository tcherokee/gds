import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json();
  const apiToken = import.meta.env.PUBLIC_API_TOKEN;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/ezforms/submit`,
    opts
  );

  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
