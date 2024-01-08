import { atom } from "nanostores";
import type { BadgesStore } from "../interfaces/common/types";

export const badgesOptions = atom<BadgesStore>([
  "from-gold-tag-t-gradient to-gold-tag-b-gradient",
  "from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
  "from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
]);
