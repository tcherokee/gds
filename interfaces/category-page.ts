import type { CasinoData, Faqs, IntroductionWithImage, Seo } from "./common/types";

export type CategoryPageAttributes = {
    title: string;
    slug: string;
    heading: string;
    createdAt: string;
    updatedAt: string;
    content1: string;
    content2: string;
    content3: string;
    seo: Seo;
    IntroductionWithImage: IntroductionWithImage;
    relatedCasinos: {
        data: CasinoData
    };
    faqs: Faqs[]
};

export type CategoryPageItem = {
  id: number;
  attributes: CategoryPageAttributes;
};
