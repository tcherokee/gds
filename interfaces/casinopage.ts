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
  ProsConsBlock,
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
  paymentOptions: {
    wireTransfer: boolean;
    skrill: boolean;
    postepay: boolean;
    paysafe: boolean;
    paypal: boolean;
    neteller: boolean;
    uKash: boolean;
    creditCard: boolean;
  };
  providers: {
    data: string;
  };
  introduction: string;
  howTo: {
    title: string;
    howToGroup: any[];
  };
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  proscons: ProsConsBlock;
  casinoComparison: {
    data: CasinoComparison;
  };
  faqs: {
    answer: string;
    id: number;
    question: string;
  }[];
};
