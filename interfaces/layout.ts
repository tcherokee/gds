import type { BreadcrumbData } from "./common/types";
import type {
  TProviderAttributesOnly,
  ImageData,
  Casino,
} from "./common/types";

export type Layout = {
  data: {
    data: LayoutData;
  };
  meta: any;
};

export type FooterImage = {
  id: number;
  imageName: string;
  imageLink?: string;
  image: {
    data: ImageData;
  };
};

type LayoutAttributes = {
  [key: string | symbol]: any;
  legalText: string;
  footerContent: string;
  cookiesHeaderText: string;
  cookiesDescription: string;
  cookiesUrl: string;
  cookiesLinkText: string;
  footerImages: FooterImage[];
  Logo: {
    data: ImageData;
  };
  homeBreadcrumbs: BreadcrumbData[];
  gamesBreadcrumbs: BreadcrumbData[];
  casinoBreadcrumbs: BreadcrumbData[];
  blogBreadcrumbs: BreadcrumbData[];
  slotCasinosBreadcrumbs: BreadcrumbData[];
  providersBreadcrumbs: BreadcrumbData[];
  categoriesBreadcrumbs: BreadcrumbData[];
  casinoProvidersBreadcrumbs: BreadcrumbData[];
  filterProviders: {
    data: TProviderAttributesOnly[];
  };
  most_loved_casinos: {
    data: Casino[];
  };
  no_deposit_casinos: {
    data: Casino[];
  };
  free_spin_casinos: {
    data: Casino[];
  };
  backgroundImage: {
    data: ImageData;
  };
};

export type LayoutData = {
  id: number;
  attributes: LayoutAttributes;
};

export type TAuthorPageData = {
  id: number;
  attributes: {
    authorPage: {
      id: number;
      metaTitle: string;
      metaDescription: string;
      content1: string;
      content2: string;
      content3: string;
    };
  };
};
