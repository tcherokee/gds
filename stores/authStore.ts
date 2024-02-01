import { persistentAtom } from "@nanostores/persistent";
import type { TUser } from "../interfaces/auth";

export const user = persistentAtom<TUser | null>("_user:", null, {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});

// export const messages = writable<Array<TUserMessages>>([]);
// export const readMessages = writable<Array<number>>([]);
