// Import First Party or Third Party Plugins
import { atom, computed, map } from "nanostores";

// Import Types
import type {
  CasinoData,
  CasinoFilters,
  CasinoListBlock,
  TProviderAttributesOnly,
} from "../interfaces/common/types";

type QSCasinoData = {
  data: CasinoData[];
};

type TFetchProviders = {
  data: {
    data: TProviderAttributesOnly[];
  };
};

type TAlphabetProviders = {
  label: string;
  value: string;
  image: string;
};

// Import Store Fetcher Helper
import { createFetcherStore } from "./fetcher";

export const initialCasinos = atom<CasinoListBlock | undefined>(undefined);

export const wageringReqAmount = atom<number[]>([]);
export const bonusAmount = atom<number[]>([]);

export const casinoVariables = map<CasinoFilters>({
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

export const casinoQsStore = atom<string | undefined>(undefined);

export const casinos = createFetcherStore<QSCasinoData>([
  // `${import.meta.env.PUBLIC_API_URL}/api/casinos`,
  `${import.meta.env.BASE_URL}api/casinos/casinos/`,
  casinoQsStore,
]);

// export const providers = createFetcherStore([
//   `${import.meta.env.PUBLIC_API_URL}/api/slot-providers`,
//   "?fields[0]=id&fields[1]=slug&populate[images][fields][0]=url&pagination[page]=1&pagination[pageSize]=1000&sort[0]=listSortOrder%3Aasc&fields[2]=title",
// ]);

// export const alphabeticProviders = computed(providers, (providersArr) => {

//   const { data  } = providersArr as TFetchProviders

//   if (data) {
//     const grouped = (data?.data).reduce(
//       (
//         acc: Record<string, TAlphabetProviders[]>,
//         item: TProviderAttributesOnly
//       ) => {
//         // Extract required information
//         const label = item.attributes.title || "";
//         const value = item.attributes.slug || "";
//         const image = item.attributes.images?.data?.attributes.url || "";

//         // Get the first letter of the label
//         const firstLetter = label[0].toUpperCase();

//         // Create a new group if it doesn't exist
//         if (!acc[firstLetter]) {
//           acc[firstLetter] = [];
//         }

//         // Push the item to the corresponding group
//         acc[firstLetter].push({ label, value, image });

//         return acc;
//       },
//       {} as Record<string, TAlphabetProviders[]>
//     );

//     // Sort Array
//     const sorted = Object.keys(grouped)
//       .sort()
//       .map((letter) => [
//         letter,
//         grouped[letter].sort((a, b) => a.label.localeCompare(b.label)),
//       ]);

//     return sorted;
//   }

// });

export const providers = atom<TProviderAttributesOnly[]>([]);

export const alphabeticProviders = computed(providers, (providersArr) => {
  // const { data } = providersArr as TFetchProviders;

  const grouped = providers.get().reduce(
    (
      acc: Record<string, TAlphabetProviders[]>,
      item: TProviderAttributesOnly
    ) => {
      // Extract required information
      const label = item.attributes.title || "";
      const value = item.attributes.slug || "";
      const image = item.attributes.images?.data?.attributes.url || "";

      // Get the first letter of the label
      const firstLetter = label[0].toUpperCase();

      // Create a new group if it doesn't exist
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      // Push the item to the corresponding group
      acc[firstLetter].push({ label, value, image });

      return acc;
    },
    {} as Record<string, TAlphabetProviders[]>
  );
  // Sort Array
  const sorted = Object.keys(grouped)
    .sort()
    .map((letter) => [
      letter,
      grouped[letter].sort((a, b) => a.label.localeCompare(b.label)),
    ]);

  return sorted;
});
