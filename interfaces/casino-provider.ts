import type {
  Seo,
  Block,
  Author,
  CasinoBonus,
  ImageInfo,
  BonusSection,
  TermsAndConditions,
  CasinoGeneralInfo,
  CasinoComparison,
} from "./common/types";

export type Casinoprovider = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  content1: string;
  content2: string;
  content3: string;
  updatedAt: string;
  IntroductionWithImage: {
    heading: string;
    id: number;
    image: ImageInfo;
    Introduction: string;
  };
  casinoLists: string;
  seo: Seo;
  author: {
    data: Author;
  };
};
