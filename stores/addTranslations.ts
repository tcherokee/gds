import { atom, map } from "nanostores";
import type {
  Translations,
  TranslationDataItem,
} from "../interfaces/translation";

export const getTranslations = map<Translations>({
    test: 'test',
});

export const addTranslations = (translations: TranslationDataItem) => {
  const translation = translations.attributes.translation.reduce(
    (obj: Translations, item) => {
      obj[item.key] = item.value;
      return obj;
    },
    {} as Translations
  );

    getTranslations.set({ ...translation });
};

