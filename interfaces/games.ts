import type { ImageData, ProviderData, Category } from "./common/types";

export type Game = {
  id: number;
  attributes: GameAttributes;
};

export type GameFavourites = {
  [key: string]: GameAttributes;
};

type GameAttributes = {
  createdAt: string;
  title: string;
  slug: string;
  ratingAvg: number;
  publishedAt: string;
  images: {
    data: ImageData;
  };
  provider: ProviderData;
  categories: {
    data: Category[];
  };
};
