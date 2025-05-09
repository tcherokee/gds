import { atom } from "nanostores";
import type { SortStore, FilterStore } from "../interfaces/common/types";

export const filterOptions = atom<FilterStore>({
  "Free Spins": "freeSpinsSection",
  "No Deposit": "noDepositSection",
  Playthrough: "playthrough",
});

export const sortOptions = atom<SortStore>({
  Newest: "createdAt:desc",
  "Most Popular": "views:desc",
  "Top Rated": "ratingAvg:desc",
  "Top Rated Author": "authorRatings:desc",
  "Top Rated Users": "ratingAvg:desc",
  "Most Viewed": "views:desc",
});
