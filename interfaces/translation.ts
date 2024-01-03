export type Translation = {
  data: TranslationDataItem;
  meta: Record<string, unknown>;
};

export type TranslationItem = {
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

export type TranslationDataItem = {
  id: number;
  attributes: Attributes;
};

export type Translations = {
  [key: string]: string | undefined;
};
