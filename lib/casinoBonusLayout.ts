import { allTasks } from "nanostores";
import type { CasinoData, TranslationData } from "../interfaces/common/types";
import { getTranslations } from "../stores/addTranslations";

// Set Nano Store to active state to start data loading
getTranslations.listen(() => { })

// Wait for nanostore to finish loading
await allTasks()

// Get the now loaded translations and add them to the translation store variable
const translationStore: TranslationData = getTranslations.get();

// Function to extract the appropropriate welcome bonus amounts for the casino table
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

// Function to extract the appropriate No Deposit Bonus Amounts for the Casino Table
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
