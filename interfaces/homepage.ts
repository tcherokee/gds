import type { Seo, Block } from "./common/types";

export type Homepage = {
  id: number;
  attributes: Attributes;
  seo: Seo;
};

type Attributes = {
  title: string;
  heading: string | null;
  updatedAt: string;
  blocks: Block[];
};
