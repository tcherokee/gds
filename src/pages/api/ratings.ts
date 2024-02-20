import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  const ratingValue = url.searchParams.get("ratingValue");
  const itemPath = url.searchParams.get("itemPath");

  const body = {
    data: {
      ratingAvg: ratingValue,
    },
  };

  const opts = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/${itemPath}/${id}`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
