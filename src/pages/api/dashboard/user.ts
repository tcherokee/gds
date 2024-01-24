import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  console.log("TOKEN", cookies.get("_token")?.value);
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
  };

  console.log("USER_URL", `${import.meta.env.PUBLIC_API_URL}/api/users/me`);
  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/users/me`,
    opts
  );
  const data = await res.json();
  console.log(data);

  return new Response(JSON.stringify(data), { status: 200 });
};
