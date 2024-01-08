import { persistentAtom } from "@nanostores/persistent";
import type { GameFavourites } from "../interfaces/games";

export const favourite = persistentAtom<GameFavourites>("_favourites:", [], {
    encode (value) {
    return JSON.stringify(value)
  },
  decode (value ) {
    return JSON.parse(value)
  }
});