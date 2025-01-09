import { getDBCountries } from "./api-requests";

export const getUserCountryByIP = async (clientIP: string) => {
  try {
    const ipAddress = clientIP.split(",")[0];

    //get country by IP
    const IPCountry = await fetch(
      `https://ipinfo.io/${ipAddress}?token=262bfc99d3cceb`
    )
      .then((res) => res.json())
      .then();

    return { location: IPCountry, ip: ipAddress };
  } catch (error) {
    console.error(error);
  }
};

export const userCountryHandler = async (shortCode: string) => {
  try {
    const getSavedCountries = await getDBCountries();

    const country = getSavedCountries?.find(
      ({ attributes }) => attributes?.shortCode === shortCode
    );

    let short_code = country ? shortCode : "rod";

    return { sc: short_code, savedCountries: getSavedCountries };
  } catch (error) {
    console.error(error);
  }
};
