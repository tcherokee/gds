import qs from "qs";
import { onMount, task, map } from "nanostores";
import fetchApi from '../lib/strapi'
import { translationsQs } from "../qs/layout";
import type { TranslationDataItem } from "../interfaces/translation";
import type { TranslationData } from "../interfaces/common/types";

export const getTranslations = map<TranslationData>({
    test: 'test',
});

onMount(getTranslations, () => {
  task(async () => {
    try {
      const translationQuery = qs.stringify(translationsQs(), {
        encodeValuesOnly: true,
      });
      const response = await fetchApi<TranslationDataItem>({
        endpoint: "translation",
        wrappedByKey: "data",
        query: `?${translationQuery}`,
      });

      const translations = response.attributes.translation.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {}
      );

      getTranslations.set(translations);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  });
});

// export const addTranslations = (translations: TranslationDataItem) => {

//     console.log('here')

//   const translation = translations.attributes.translation.reduce(
//     (obj: Translations, item) => {
//       obj[item.key] = item.value;
//       return obj;
//     },
//     {} as Translations
//   );

//     getTranslations.set({ ...translation });
// };

