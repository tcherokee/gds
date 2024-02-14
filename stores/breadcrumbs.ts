import qs from "qs";
import { onMount, task, atom } from "nanostores";
import fetchApi from "../lib/strapi";
import { layoutQs } from "../qs/layout";
import type {
  BreadcrumbData,
  TranslationData,
} from "../interfaces/common/types";
import type { LayoutData } from "../interfaces/layout";

export const getBreadcrumbs = atom<{ [key: string]: BreadcrumbData[] }>({});

onMount(getBreadcrumbs, () => {
  task(async () => {
    try {
      const query = qs.stringify(layoutQs(), { encodeValuesOnly: true });
      const response = await fetchApi<LayoutData>({
        endpoint: "layout",
        wrappedByKey: "data",
        query: `?${query}`,
      });

      getBreadcrumbs.set({
        homeBreadcrumbs: response.attributes.homeBreadcrumbs,
        casinoBreadcrumbs: response.attributes.casinoBreadcrumbs,
        gamesBreadcrumbs: response.attributes.gamesBreadcrumbs,
        blogBreadcrumbs: response.attributes.blogBreadcrumbs,
        slotCasinosBreadcrumbs: response.attributes.slotCasinosBreadcrumbs,
        providersBreadcrumbs: response.attributes.providersBreadcrumbs,
        categoriesBreadcrumbs: response.attributes.categoriesBreadcrumbs,
        casinoProvidersBreadcrumbs:
          response.attributes.casinoProvidersBreadcrumbs,
      });
    } catch (error) {
      console.error("Error fetching layout:", error);
    }
  });
});
