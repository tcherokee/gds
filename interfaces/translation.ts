export default interface Translation {
  data: Data;
  meta: Record<string, unknown>;
}

interface TranslationItem {
  id: number;
  key: string;
  value: string;
}

interface Attributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  translation: TranslationItem[];
}

interface Data {
  id: number;
  attributes: Attributes;
}
