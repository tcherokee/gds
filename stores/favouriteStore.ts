import { persistentAtom } from "@nanostores/persistent";
import type { GameFavourites, TUserGame } from "../interfaces/games";

export const favourite = persistentAtom<Array<TUserGame>>("_favourites:", [], {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});