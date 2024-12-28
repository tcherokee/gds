import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const clientIP =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    "";
  return new Response(JSON.stringify({ ip: clientIP }), {
    headers: { "Content-Type": "application/json" },
  });
};
