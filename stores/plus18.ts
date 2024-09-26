import { persistentAtom } from "@nanostores/persistent";

export const plus18 = persistentAtom<boolean>("acceptlus18", false, {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});
