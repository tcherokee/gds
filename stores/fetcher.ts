import { nanoquery } from "@nanostores/query";

const opts = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
  },
};

export const [createFetcherStore, createMutatorStore] = nanoquery({
    fetcher: (...keys: (string | number | boolean)[]) => fetch(keys.join(""), opts).then((r) => r.json())
});