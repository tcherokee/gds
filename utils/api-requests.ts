import qs from "qs";
import type { TranslationDataItem } from "../interfaces/translation";
import type { CountryDataItem } from "../interfaces/country";
import fetchApi from "../lib/strapi";
import { translationsQs, countriesQs, layoutQs } from "../qs/layout";
import type { TProviderAttributesOnly } from "../interfaces/common/types";
import type { TUserGameProvider } from "../interfaces/games";
import type { LayoutData } from "../interfaces/layout";

export const getLocalisation = async () => {
  try {
    const layoutQuery = qs.stringify(layoutQs(), {
      encodeValuesOnly: true,
    });
    const response = await fetchApi<LayoutData>({
      endpoint: "layout",
      wrappedByKey: "data",
      query: `?${layoutQuery}`,
    });

    return response.attributes.localisation;
  } catch (error) {
    console.error(error);
  }
};

export const getDBCountries = async () => {
  try {
    const countryQuery = qs.stringify(countriesQs(), {
      encodeValuesOnly: true,
    });
    const response = await fetchApi<CountryDataItem[]>({
      endpoint: "countries",
      wrappedByKey: "data",
      query: `?${countryQuery}`,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTranslations = async () => {
  try {
    const translationQuery = qs.stringify(translationsQs(), {
      encodeValuesOnly: true,
    });
    const response = await fetchApi<TranslationDataItem>({
      endpoint: "translation",
      wrappedByKey: "data",
      query: `?${translationQuery}`,
    });

    const translations = response.attributes.translation.reduce<
      Record<string, string>
    >(
      (acc, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    return translations;
  } catch (error) {
    console.error(error);
  }
};

export const slotCategories = async () => {
  try {
    const slotCategoriesResponse = await fetchApi<any[]>({
      endpoint: "slot-categories",
      wrappedByKey: "data",
      query: `?fields[0]=id&fields[1]=slug&pagination[page]=1&pagination[pageSize]=1000&sort[0]=listSortOrder%3Aasc&fields[2]=title`,
    });
    let slotCategoriesArr: TUserGameProvider[] = [];
    if (slotCategoriesResponse.length) {
      slotCategoriesArr = slotCategoriesResponse.map(
        (category: { id: number; attributes: TUserGameProvider }) => {
          return {
            title: category.attributes.title,
            slug: category.attributes.slug,
          };
        }
      );
    }
    return slotCategoriesArr ?? [];
  } catch (error) {
    console.error(error);
  }
};

export const slotProviders = async () => {
  try {
    const providersArr = await fetchApi<TProviderAttributesOnly[]>({
      endpoint: "slot-providers",
      wrappedByKey: "data",
      query: `?fields[0]=id&fields[1]=slug&populate[images][fields][0]=url&pagination[page]=1&pagination[pageSize]=1000&sort[0]=listSortOrder%3Aasc&fields[2]=title`,
    });
    return providersArr ?? [];
  } catch (error) {
    console.error(error);
  }
};
