import qs from 'qs'
import { atom, map, computed, allTasks, task, onMount } from "nanostores";
import { createFetcherStore } from "./fetcher";
import type { Game } from "../interfaces/games";


const opts = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
  },
};

export const gameVariables = map({
  limit: 1000,
  sort: "ratingAvg:desc",
  page: 1,
  providers: [],
  categories: [],
  author: ''
});

export const gamesQsStore = atom<string | undefined>(undefined);

export const providersFilters = createFetcherStore([
  `${import.meta.env.PUBLIC_API_URL}/api/layout`,
  "?fields[0]=id&populate[filterProviders][fields][0]=slug&populate[filterProviders][populate][images][fields][0]=url",
]);

export const categoriesFilters = createFetcherStore([
  `${import.meta.env.PUBLIC_API_URL}/api/slot-categories`,
  "?fields[0]=id&fields[1]=slug&pagination[page]=1&pagination[pageSize]=1000&sort[0]=listSortOrder%3Aasc&fields[2]=title",
]);

export const games = createFetcherStore<{ data: Game[] }>([
  `${import.meta.env.PUBLIC_API_URL}/api/games`,
  gamesQsStore,
]);
