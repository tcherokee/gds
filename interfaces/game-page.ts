import type {
  Seo,
  Author,
  ImageInfo,
  Block,
  ProsConsBlock,
} from "./common/types";

export type Gamepage = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  heading: string | null;
  updatedAt: string;
  seo: Seo;
  author: {
    data: Author;
  };
  images: ImageInfo;
  ratingAvg: number;
  ratingCount: number;
  authorRatings: number;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  isGameDisabled: boolean;
  gameDisableText: string;
  introduction: string;
  blocks: Block[];
  gameInfoTable: {
    [key: string]: string;
    rtp: string;
    volatilita: string;
    layout: string;
    lineeDiPuntata: string;
    puntataMinima: string;
    puntataMassima: string;
    jackpot: string;
    freeSpins: string;
    bonusGame: string;
  };
  howTo: {
    title: string;
    howToGroup: any[];
  };
  proscons: ProsConsBlock;
  embedCode: {
    desktopEmbedCode: string;
  };
  provider: {
    data: {
      attributes: {
        slug: string;
        title: string;
        relatedCasinos: {
          data: [];
        };
        games: {
          data: [];
        };
      };
    };
  };
  faqs: {
    answer: string;
    id: number;
    question: string;
  }[];
};
