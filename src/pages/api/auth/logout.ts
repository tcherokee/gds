import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete("_token", { path: "/" });
  cookies.delete("_ppToken", { path: "/" });

  return new Response(JSON.stringify({}), { status: 200 });
};
