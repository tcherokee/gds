import { persistentAtom } from "@nanostores/persistent";

export const adPopup = persistentAtom<{ status: boolean; statusDate: string }>(
  "adPopupStatus",
  {
    status: false,
    statusDate: `${new Date().toLocaleDateString()}`,
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
