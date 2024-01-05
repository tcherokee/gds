import type {
  Seo,
  Block,
  Author,
  CasinoBonus,
  ImageInfo,
  BonusSection,
} from "./common/types";

export type Casinopage = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  heading: string | null;
  updatedAt: string;
  blocks: Block[];
  seo: Seo;
  author: Author;
  casinoBonus: CasinoBonus;
  images: ImageInfo;
  ratingAvg: number;
  ratingCount: number;
  bonusSection: BonusSection;
  noDepositSection: BonusSection;
  freeSpinsSection: BonusSection;
};
