import { getDBCountries } from "./api-requests";

export const getUserCountryByIP = async () => {
  try {
    //get IP
    const IPRequest = await fetch(`${import.meta.env.PUBLIC_FULL_URL}/api/ip/`)
      .then((res) => res.json())
      .then();

    console.log(IPRequest);

    const ipAddress = IPRequest.ip.split(",")[0];

    console.log("ipAddress", ipAddress);

    // const IPRequest = await fetch("https://api.ipify.org/?format=json")
    //   .then((res) => res.json())
    //   .then();

    //get country by IP
    const IPCountry = await fetch(
      `https://ipinfo.io/${ipAddress}?token=262bfc99d3cceb`
    )
      .then((res) => res.json())
      .then();

    return { co: IPCountry, ip: ipAddress };
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

    return country ? shortCode : "rod";
  } catch (error) {
    console.error(error);
  }
};
