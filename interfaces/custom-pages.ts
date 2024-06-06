import type { Seo, Author, Block, BreadcrumbData } from "./common/types";

export type CustomPageAttributes = {
  title: string;
  urlPath: string;
  createdAt: string;
  updatedAt: string;
  seo: Seo;
  breadcrumbs: BreadcrumbData[];
  author: {
    data: Author;
  };
  showContentDate: boolean;
  blocks: Block[];
};

export type CustomPageItem = {
  id: number;
  attributes: CustomPageAttributes;
};
