import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ cookies, url }) => {
  const favoriteId = url.searchParams.get("favoriteId");
  const opts = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/user-favourite-games/${favoriteId}`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
