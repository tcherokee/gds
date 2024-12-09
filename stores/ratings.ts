import { persistentAtom } from "@nanostores/persistent";

export type TRatings = {
  type: "games" | "casinos" | "sports";
  id: number;
  ratingValue: number;
};

export const ratings = persistentAtom<TRatings[]>("_ratings:", [], {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});
