import type {
  Seo,
  Block
} from "../common/types";

export type Homepage = {
  id: number;
  attributes: {
    title: string;
    heading: string | null;
    updatedAt: string;
    blocks: Block[];
    seo: Seo;
  };
};
