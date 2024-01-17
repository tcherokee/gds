// Import First Party or Third Party Plugins
import { atom } from "nanostores";

// Import Store Fetcher Helper
import { createFetcherStore } from "./fetcher";

const opts = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
  },
};

export const casinoQsStore = atom('')

export const casinos = createFetcherStore([
  `${import.meta.env.PUBLIC_API_URL}/api/casinos`,
  casinoQsStore,
]);
