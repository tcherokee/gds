import type { AuthorBlogAttributes } from "./blog"
import type { AuthorGameAttributes } from "./games";
import type { Seo, AuthorCasinoAttributes } from "./common/types";

export type TAuthor = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  heading: string;
  content1: string;
  jobTitle: string;
  facebookLink: string;
  linkedInLink: string;
  slug: string;
  twitterLink: string;
  experience: string;
  areaOfWork: string;
  specialization: string;
  isAnAuthor: boolean;
  photo: {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    createdAt: string;
    updatedAt: string;
  };
  blogs: AuthorBlogAttributes[];
  games: AuthorGameAttributes[];
  casinos: AuthorCasinoAttributes[];
  seo: Seo
};

export type TAuthorIndex = {
  id: number;
  firstName: string;
  lastName: string;
  content1: string;
  facebookLink: string;
  linkedInLink: string;
  slug: string;
  twitterLink: string;
  photo: {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    createdAt: string;
    updatedAt: string;
  };
};