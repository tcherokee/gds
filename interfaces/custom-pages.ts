import type { Seo, Author, Block, BreadcrumbData } from "./common/types";

export type CustomPageAttributes = {
  title: string;
  urlPath: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  seo: Seo;
  breadcrumbs: BreadcrumbData[];
  author: {
    data: Author;
  };
  showContentDate: boolean;
  sideBarToShow: "casino" | "sport";
  blocks: Block[];
};

export type CustomPageItem = {
  id: number;
  attributes: CustomPageAttributes;
};

export type CustomPageMetadata = {
  id: number;
  documentId: string;
  attributes: {
    title: string;
    urlPath: string;
    publishedAt: string;
  };
};
