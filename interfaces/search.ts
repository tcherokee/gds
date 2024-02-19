export type TSearchGame = {
  _meilisearch_id: string;
  id: number;
  url: string;
  slug: string;
  avgRating: number;
  ratingCount: number;
  title: string;
  bonusUrl: string;
  logo: string;
  logoSmall: string;
  categoryTitle: string[];
  providerTitle: string;
  providerSlug: string;
  providerLogo: string;
  _highlightResult: HighlightResult;
  _snippetResult: SnippetResult;
  __position: number;
};

type HighlightResult = {
  _meilisearch_id: HighlightValue<string>;
  id: HighlightValue<string>;
  url: HighlightValue<string>;
  slug: HighlightValue<string>;
  avgRating: HighlightValue<string>;
  ratingCount: HighlightValue<string>;
  title: HighlightValue<string>;
  bonusUrl: HighlightValue<string>;
  logo: HighlightValue<string>;
  logoSmall: HighlightValue<string>;
  categoryTitle: HighlightValue<string>[];
  providerTitle: HighlightValue<string>;
  providerSlug: HighlightValue<string>;
  providerLogo: HighlightValue<string>;
};

type SnippetResult = {
  _meilisearch_id: HighlightValue<string>;
  id: HighlightValue<string>;
  url: HighlightValue<string>;
  slug: HighlightValue<string>;
  avgRating: HighlightValue<string>;
  ratingCount: HighlightValue<string>;
  title: HighlightValue<string>;
  bonusUrl: HighlightValue<string>;
  logo: HighlightValue<string>;
  logoSmall: HighlightValue<string>;
  categoryTitle: HighlightValue<string>[];
  providerTitle: HighlightValue<string>;
  providerSlug: HighlightValue<string>;
  providerLogo: HighlightValue<string>;
};

type HighlightValue<T> = {
  value: T;
};
