// Import First and Third Party Plugins
import { allTasks } from "nanostores";
import { atom, computed } from "nanostores";

// Import Types
import type { BonusLabels } from "../interfaces/common/types";

// Set Nano Store to active state to start data loading
getTranslations.listen(() => { })

// Wait for nanostore to finish loading
await allTasks()

// Stores
import { getTranslations } from "./addTranslations";

// Using computed to ensure the value updates once the getTranslation store updates
export const bonusLabels = computed(getTranslations, getTranslations => {
    const labels: BonusLabels = {
      "No Deposit": {
        label: getTranslations.withoutDeposit,
        value: "noDepositSection",
      },
      "Free Spins": {
        label: getTranslations.freeSpins,
        value: "freeSpinsSection",
      },
      "Welcome Bonus": {
        label: getTranslations.firstDeposit,
        value: "bonusSection",
      },
      // "Playthough": {
      //   label: getTranslations.playthrough,
      //   value: "playthough",
      // },
    };
  
    return labels;
})

export const conditions = computed(getTranslations, getTranslations => {
  const conditions: BonusLabels = {
    "After Registration": {
      label: getTranslations.conditionRegistration,
      value: "After Registration",
    },
    "After Validation": {
      label: getTranslations.conditionValidateAcct,
      value: "After Validation",
    },
    "After Deposit": {
      label: getTranslations.conditionDeposit,
      value: "After Deposit",
    },
  };

  return conditions
})

export const sort = computed(getTranslations, (getTranslations) => {
  const labels: BonusLabels = {
      "Top Rated Users": {
          label: getTranslations.sortVoteUsers,
          value: "ratingAvg:desc"
      },
      "Top Rated Author": {
        label: getTranslations.sortVoteAuthor,
          value: "authorRatings:desc"
      },
      "Welcome Bonus": {
        label: getTranslations.sortWelcomeBonus,
        value: "bonusSection.bonusAmount:desc",
      },
      "Alphabetic": {
        label: getTranslations.sortAZ,
        value: "title:asc"
      },
      "Newest": {
        label: getTranslations.sortDateAdded,
        value: "createdAt:desc"
      },
  };

  return labels;
});