import type { Toggles } from "../interfaces/common/types";

export const handleToggle = (key: string, toggleArr: Toggles) => {
  // Set all toggles to false initially except the one clicked
//   Object.keys(toggleArr).forEach((toggle) => {
//     if (toggle !== key) {
//       toggleArr[toggle as keyof Toggles] = false;
//     }
//   });

//   // Then set the specified key to true, if it exists
//   if (toggleArr.hasOwnProperty(key)) {
//     toggleArr[key as keyof Toggles] = !toggleArr[key as keyof Toggles];
//   }
    
    let updatedToggles = { ...toggles };

    Object.keys(updatedToggles).forEach((toggle) => {
      if (toggle !== key) {
        updatedToggles[toggle] = false;
      }
    });

    if (updatedToggles.hasOwnProperty(key)) {
      updatedToggles[key] = !updatedToggles[key];
    }

    return updatedToggles;
};
