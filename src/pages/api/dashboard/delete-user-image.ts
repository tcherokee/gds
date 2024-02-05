import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ cookies, url }) => {
  const id = url.searchParams.get("id");
  const opts = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/upload/files/${id}`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
