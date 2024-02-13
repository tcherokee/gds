import fetchApi from "../../lib/strapi";

let cachedRedirects: string | null = null;
let cacheTimestamp: number = Date.now();
const CACHE_DURATION: number = 7 * 24 * 60 * 60 * 1000; // Cache Redirects for 7 Days

export const onRequest = async (context, next) => {
  const url = new URL(context.url);
    const path = url.pathname;
    
    const redirects = await fetchApi({
      endpoint: "redirects",
      wrappedByKey: "data",
      query: `?pagination[pageSize]=1000`,
    });

    console.log('redirects', redirects)

  // Check and fetch redirects if needed
    // if (!cachedRedirects || Date.now() - cacheTimestamp > CACHE_DURATION) {
    //   const res = await fetch(`${FULL_URL}/api/redirects`);
    //   cachedRedirects = await res.json();
    //   cacheTimestamp = Date.now();
    // }

    // // Loop through each item in the data array
    // for (const item of cachedRedirects?.data ?? []) {
    //   const { redirectUrl, redirectTarget, redirectMethod } = item.attributes;

    //   // Check if the current URL matches the redirectUrl
    //   if (pathname === redirectUrl) {
    //     // Determine the status code for the redirect
    //     const statusCode = redirectMethod === "permanent" ? 308 : 307;

    //     // Redirect to the target URL
    //     return Response.redirect(
    //       redirectTarget.includes("http")
    //         ? redirectTarget
    //         : `${origin}${redirectTarget}`,
    //       statusCode
    //     );
    //   }
    // }

  const response = await next();
  const html = await response.text();
  const redactedHtml = html.replaceAll("PRIVATE INFO", "REDACTED");

  return new Response(redactedHtml, {
    status: 200,
    headers: response.headers,
  });
};
