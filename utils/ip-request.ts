import { getDBCountries } from "./api-requests";

const siteID = import.meta.env.SITE_ID;
export const getUserCountry = async () => {
  if (siteID === "tgs") { // run this code for tgs only.
    try {
      //get country from google cloud
      const location = await fetch(`https://kenshomedia.ew.r.appspot.com/`)
        .then((res) => res.json())
        .then();

      return { location, ip: location.userIP };
    } catch (error) {
      console.error(error);
    }
  } else {
    return null;
  }
};

export const userCountryHandler = async (shortCode: string) => {
  try {
    const getSavedCountries = await getDBCountries();
    const country = getSavedCountries?.find(
      ({ attributes }) => attributes?.shortCode === shortCode
    );

    let short_code = country ? shortCode : "rod";

    return { sc: short_code };
  } catch (error) {
    console.error(error);
  }
};
