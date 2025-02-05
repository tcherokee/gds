import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, cookies }) => {
  const username = url.searchParams.get("username") as string;
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: cookies.get("_ppToken")?.value as string,
      license: `${import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY}`,
      username,
    },
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}getPlayerTournamentHistory`,
    opts
  );
  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
