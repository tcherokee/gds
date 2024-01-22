/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly SITE_ID: string;
  readonly API_TOKEN: string;
  readonly PUBLIC_MEILISEARCH_HOST: string;
  readonly PUBLIC_MEILISEARCH_SEARCH_KEY: string;
  readonly PUBLIC_MEILISEARCH_INDEX_NAME: string;
  readonly HOSTNAME: string;
  readonly FULL_URL: string;
  readonly LANG: string;
  readonly PUBLIC_ROOT_DOMAIN: string;
  readonly PUBLIC_IMAGE_URL: string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
}
