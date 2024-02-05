import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request }) => {
  const payload = await request.formData();
  const opts = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
    body: payload,
  };

  const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/upload`, opts);
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
