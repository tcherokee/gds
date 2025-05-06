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

export type Slotprovider = {
  id: number;
  documentId: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  slug: string;
  content1: string;
  content2: string;
  content3: string;
  updatedAt: string;
  dateCreated: string;
  showGameFilterPanel: boolean;
  IntroductionWithImage: {
    heading: string;
    id: number;
    image: ImageInfo;
    Introduction: string;
  };
  relatedCasinos: {
    data: {
      title: string;
      playthrough: string;
      ratingAvg: number;
      ratingCount: number;
    }[];
  };
  seo: Seo;
  author: {
    data: Author;
  };
  faqs: {
    answer: string;
    id: number;
    question: string;
  }[];
};
