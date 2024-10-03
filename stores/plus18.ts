import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const isPlus18 = persistentAtom<{ status: boolean; statusDate: string }>(
  "plus18Status",
  { status: false, statusDate: "0" },
  {
    encode(value) {
      return JSON.stringify(value);
    },
    decode(value) {
      return JSON.parse(value);
    },
  }
);
