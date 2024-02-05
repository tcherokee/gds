import type { ImageData, ProviderData, Category } from "./common/types";

export type Game = {
  id: number;
  attributes: GameAttributes;
};

export type GameFavourites = GameAttributes[];

export type GameAttributes = {
  id: number;
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

export type TDashboardGame = {
  id: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  game: TUserGame;
};

export type TUserGame = {
  id: number;
  title: string;
  slug: string;
  ratingAvg: number;
  publishedAt: string;
  images: TUserGameImage;
  provider: TUserGameProvider;
  categories: {
    title: string;
  }[];
};

export type TUserGameImage = {
  url: string;
};

export type TUserGameProvider = {
  slug: string;
  title: string;
};
