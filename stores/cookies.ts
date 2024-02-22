import { persistentAtom } from "@nanostores/persistent";

export const cookies = persistentAtom<boolean>("_acceptCookies:", false, {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});
