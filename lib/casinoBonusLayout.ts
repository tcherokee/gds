import type { CasinoData, TranslationData } from "../interfaces/common/types";
import { getTranslations } from "../stores/addTranslations"

const translationStore: TranslationData = getTranslations.get();

export const welcomeBonus = (casino: CasinoData) => {
  const { bonusAmount, cashBack, freeSpin } =
    casino?.attributes?.bonusSection || {};

  const bonuses = [
    bonusAmount && `${bonusAmount}€ ${translationStore.reloadBonus}`,
    cashBack && `${cashBack}`,
    freeSpin && `${freeSpin}`,
  ].filter(Boolean); // Filter out falsy values

  return bonuses.join(" + <br/>");
};

export const noDepositBonus = (casino: CasinoData) => {
  const { noDepositSection, freeSpinsSection } = casino?.attributes || {};

  const bonuses = [
    noDepositSection?.bonusAmount &&
      `${noDepositSection.bonusAmount}€ ${translationStore.withoutDeposit}`,
    freeSpinsSection?.bonusAmount &&
      `${freeSpinsSection.bonusAmount} ${translationStore.freeSpins}`,
  ].filter(Boolean); // Filter out falsy values

  const terms = [
    noDepositSection?.termsConditions &&
      `<strong>${translationStore.withoutDeposit}</strong><br/> ${noDepositSection?.termsConditions}`,
    freeSpinsSection?.termsConditions &&
      `<strong>${translationStore.withoutDeposit}</strong><br/> ${freeSpinsSection?.termsConditions}`,
  ].filter(Boolean);

  return {
    bonus: bonuses.join(" + <br/>"),
    terms: terms.join("<br/><br/>"),
  };
};
