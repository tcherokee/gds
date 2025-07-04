import type { Seo, Block } from "./common/types";

export type Homepage = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  heading: string | null;
  updatedAt: string;
  blocks: Block[];
  seo: Seo;
};
