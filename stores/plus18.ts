import { persistentAtom } from "@nanostores/persistent";
import dayjs from "dayjs";

export const isPlus18 = persistentAtom<{ status: boolean; expiryDate: string }>(
  "plus18Status",
  {
    status: false,
    expiryDate: `${dayjs().format("YYYY-MM-DD")}`,
  },
  {
    encode(value) {
      return JSON.stringify(value);
    },
    decode(value) {
      return JSON.parse(value);
    },
  }
);
