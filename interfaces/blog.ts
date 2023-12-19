import type { ImageData, Seo, Author } from "./common/types";

export type Blog = {
  id: number;
  attributes: BlogAttributes;
};

export type BlogAttributes = {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  content1: string;
  publishedAt: string;
  images: {
    data: ImageData;
  };
  author: {
    data: Author;
  };
  seo: Seo;
};
