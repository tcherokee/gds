import { createFetcherStore } from "./fetcher";

const opts = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
  },
};

export const games = createFetcherStore([
  `${import.meta.env.PUBLIC_API_URL}/api/games`,
  "?filters[slug][$eq]=the-big-dawgs",
]);
