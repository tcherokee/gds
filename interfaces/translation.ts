export type Translation = {
  data: DataItem;
  meta: Record<string, unknown>;
};

type TranslationItem = {
  id: number;
  key: string;
  value: string;
};

type Attributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  translation: TranslationItem[];
};

type DataItem = {
  id: number;
  attributes: Attributes;
};
