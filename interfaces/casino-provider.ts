import type { Seo, Author, ImageInfo, Faqs } from "./common/types";

export type Casinoprovider = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  slug: string;
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
  casinoLists: {
    data: {
      slug: string;
      playthrough: string;
      ratingAvg: number;
      ratingCount: number;
      authorRatings: number;
      publishedAt: string;
    };
  };
  seo: Seo;
  author: {
    data: Author;
  };
  faqs: Faqs[];
  casinoComparison: {
    data: {
      slug: string;
      playthrough: string;
      ratingAvg: number;
      ratingCount: number;
      authorRatings: number;
      publishedAt: string;
    }[];
  };
};
