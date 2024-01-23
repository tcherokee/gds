// Import First Party or Third Party Plugins
import { atom, map, onSet } from "nanostores";

// Import Types
import type { CasinoFilters, CasinoData } from "../interfaces/common/types";

type QSCasinoData = {
  data: CasinoData[]
}

// Import Store Fetcher Helper
import { createFetcherStore } from "./fetcher";

export const wageringReqAmount = atom<number[]>([])
export const bonusAmount = atom<number[]>([]);

export const casinoVariables = map<CasinoFilters>({
  limit: 1000,
  sort: "ratingAvg:desc",
  providers: "",
  ids: [],
  bonusKey: "bonusSection",
  condition: "",
  amount: "",
  wagering: "",
  speed: "",
});

export const casinoQsStore = atom<string | undefined>(undefined)

export const casinos = createFetcherStore<QSCasinoData>([
  `${import.meta.env.PUBLIC_API_URL}/api/casinos`,
  casinoQsStore,
]);
