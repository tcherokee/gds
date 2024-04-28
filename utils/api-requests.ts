import qs from "qs";
import type { TranslationDataItem } from "../interfaces/translation";
import fetchApi from "../lib/strapi";
import { translationsQs } from "../qs/layout";

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
    console.log(error);
  }
};
