import type { FetchApiParams } from "../interfaces/common/types";

const fetchGamesApi = async <T>({
  endpoint,
  query,
}: FetchApiParams): Promise<T> => {
  let modifiedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  const opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        import.meta.env.PUBLIC_GAMES_API_TOKEN ?? process.env.PUBLIC_GAMES_API_TOKEN
      }`,
    },
  };

  const url = new URL(
    `${
      import.meta.env.PUBLIC_GAMES_API_URL ?? process.env.PUBLIC_GAMES_API_URL
    }/api/${modifiedEndpoint}${query}`
  );

  const res = await fetch(url.toString(), opts);
  let data = await res.json();

  return data;
};

export default fetchGamesApi;
