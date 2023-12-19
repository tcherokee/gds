import type { ImageData, Provider, Category } from "./common/types";

export type Game = {
  id: number;
  attributes: GameAttributes;
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
  provider: {
    data: Provider;
  };
  categories: {
    data: Category[];
  };
};
