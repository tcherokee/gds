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
      username: payload.username,
    },
    body: JSON.stringify({
      tournament_id: payload.tournamentId,
      action: "join",
    }),
  };

  console.log(`LICENSE: ${import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY}`);

  const res = await fetch(
    `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}startGame`,
    opts
  );
  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
