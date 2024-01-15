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
  seo: Seo;
  author: {
    data: Author;
  };
  casinoBonus: CasinoBonus;
  images: ImageInfo;
  ratingAvg: number;
  ratingCount: number;
  authorRatings: number;
  bonusSection: BonusSection;
  noDepositSection: BonusSection;
  freeSpinsSection: BonusSection;
  termsAndConditions: TermsAndConditions;
  casinoFeatures: any[];
  casinoGeneralInfo: CasinoGeneralInfo;
  testimonial: {
    approvedBy: {
      data: Author;
    };
    testimonial: string;
  };
  providers: {
    data: string;
  };

  casinoComparison: {
    data: CasinoComparison;
  };
  faqs: {
    answer: string;
    id: number;
    question: string;
  }[];
};
