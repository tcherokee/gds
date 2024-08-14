import type { ImageInfo } from "./common/types";

export type Overview = {
  id: number;
  title: string;
  url: string;
  card_img: ImageInfo;
  card_description: string;
};
