import { persistentAtom } from "@nanostores/persistent";
import dayjs from "dayjs";

export const adPopup = persistentAtom<{
  status: boolean;
  expiryDate: string;
}>(
  "adPopupStatus",
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
