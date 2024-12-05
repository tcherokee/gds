// Import First Party or Third Party Plugins
import { atom, map } from "nanostores";

// Import Types
import type {
  SportData,
  SportFilters,
  SportListBlock,
} from "../interfaces/common/types";

type QSSportData = {
  data: SportData[];
};

// Import Store Fetcher Helper
import { createFetcherStore } from "./fetcher";

export const initialSports = atom<SportListBlock | undefined>(undefined);

export const wageringReqAmount = atom<number[]>([]);
export const bonusAmount = atom<number[]>([]);

export const sportVariables = map<SportFilters>({
  limit: 1000,
  sort: "ratingAvg:desc",
  providers: [],
  ids: [],
  bonusKey: "bonusSection",
  condition: "",
  amount: "",
  wagering: "",
  speed: "",
});

export const sportQsStore = atom<string | undefined>(undefined);

export const sports = createFetcherStore<QSSportData>([
  // `${import.meta.env.PUBLIC_API_URL}/api/casinos`,
  `${import.meta.env.BASE_URL}api/sports/sports/`,
  sportQsStore,
]);
