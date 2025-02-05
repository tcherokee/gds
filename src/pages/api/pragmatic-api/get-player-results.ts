import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  let payload = await request.json();
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: cookies.get("_ppToken")?.value as string,
      license: `${import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY}`,
    },
    body: JSON.stringify({
      token: payload.token,
    }),
  };

  const res = await fetch(`${payload.apiUrl}/player/results`, opts);
  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
