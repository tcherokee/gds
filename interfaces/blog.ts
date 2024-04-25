import type { ImageData, Seo, Author } from "./common/types";

export type BlogList = {
  data: Blog[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
    };
  };
};

export type Blog = {
  id: number;
  attributes: BlogAttributes;
};

export type BlogAttributes = {
  title: string;
  slug: string;
  blogBrief: string;
  createdAt: string;
  updatedAt: string;
  content1: string;
  publishedAt: string;
  minutesRead: string;
  images: {
    data: ImageData;
  };
  blogCategory: {
    data: {
      attributes: {
        blogCategory: string;
        slug: string;
      };
    };
  };
  author: {
    data: Author;
  };
  seo: Seo;
};

export type AuthorBlogAttributes = {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  content1: string;
  publishedAt: string;
  images: {
    id: number;
    url: string;
  };
  author: {
    id: number;
    firstName: string;
    lastName: string;
    photo: {
      id: number;
      url: string;
    };
  };
  seo: Seo;
};
