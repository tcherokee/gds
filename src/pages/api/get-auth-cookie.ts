import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const authCookie = cookies.get("_token")?.value;

  return new Response(
    JSON.stringify({
      hasAuthCookkie: !!authCookie,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
