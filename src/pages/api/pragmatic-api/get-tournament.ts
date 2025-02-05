import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const tournamentId = url.searchParams.get("tournament_id");
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN}`,
      license: `${import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY}`,
    },
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}getTournamentDataById?tournament_id=${tournamentId}`,
    opts
  );
  const data = await res.json();
  console.log("GET_TOURNAMENT_API_RESPONSE:", data);

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
