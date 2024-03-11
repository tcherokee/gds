export const loadCssFont = async () => {
  const siteID = `${import.meta.env.SITE_ID}`;
  console.log("siteID", siteID);

  if (siteID === "gds") {
    console.log("loadCssFont", "GDS");
    const font = await import("../src/styles/app.gds.postcss");
    return font.default || font;
  } else {
    console.log("loadCssFont", siteID);
    const font = await import("../src/styles/app.alt.postcss");
    return font.default || font;
  }
};
