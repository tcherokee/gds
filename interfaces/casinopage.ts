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
  Faqs,
  BreadcrumbData,
  CasinoData,
  CasinoFeatures,
  HowToGroup,
} from "./common/types";

export type Casinopage = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  heading: string | null;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
  slug: string;
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
  casinoFeatures: CasinoFeatures[];
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
    data: CasinoData[];
  };
  introduction: string;
  howTo: {
    title: string;
    howToGroup: HowToGroup;
  };
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  proscons: ProsConsBlock;
  casinoComparison: {
    data: CasinoComparison;
  };
  paymentChannels: {
    data: PaymentChannels[];
  };
  faqs: Faqs[];
};

export type PaymentChannels = {
  id: number;
  attributes: {
    name: string;
    logo: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
};
