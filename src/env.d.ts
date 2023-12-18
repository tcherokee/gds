/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly SITE_ID: string;
  readonly API_TOKEN: string;
  readonly MEILISEARCH_HOST: string;
  readonly MEILISEARCH_SEARCH_KEY: string;
  readonly MEILISEARCH_INDEX_NAME: string;
}
