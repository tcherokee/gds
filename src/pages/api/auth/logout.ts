import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete("_token", { path: "/" });

  return new Response(JSON.stringify({}), { status: 200 });
};
