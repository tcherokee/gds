// First and Third Party Plugins
import { defineMiddleware } from "astro:middleware";

import type { TRedirects } from "../../interfaces/common/types";

// Helpers
import fetchApi from "../../lib/strapi";

let cachedRedirects: TRedirects[] | null = null;
let cacheTimestamp: number = Date.now();
const CACHE_DURATION: number = 7 * 24 * 60 * 60 * 1000; // Cache Redirects for 7 Days


// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    try {
      // Redirection
      const url = new URL(context.request.url);

      // Check for tournament routes on non-GDS sites
      if (
        url.pathname.includes("tournaments") &&
        import.meta.env.PUBLIC_SITE_ID !== "gds"
      ) {
        return Response.redirect(url.origin, 302);
      }

      // Check for cache-clearing trigger
      if (url.searchParams.get("clearCache") === "true") {
        cachedRedirects = null;
        cacheTimestamp = 0; // Reset timestamp
        return new Response("Redirects cache cleared.", { status: 200 });
      }

      if (!url.pathname.endsWith("/") && !url.pathname.includes(".")) {
        return context.redirect(`${url.pathname}/${url.search}`, 308);
      }

      if (!cachedRedirects || Date.now() - cacheTimestamp > CACHE_DURATION) {
        const redirects = await fetchApi<TRedirects[]>({
          endpoint: "redirects",
          wrappedByKey: "data",
          query: `?pagination[pageSize]=1000`,
        });

        cachedRedirects = redirects;
        cacheTimestamp = Date.now();
      }

      // Loop through each item in the data array
      for (const item of cachedRedirects ?? []) {
        //Destructure Attributes
        const { redirectUrl, redirectTarget, redirectMethod } = item.attributes;

        // Check if the current URL matches the redirectUrl
        if (context.url.pathname === redirectUrl) {
          // Determine the status code for the redirect
          const statusCode = redirectMethod === "permanent" ? 308 : 307;

          // Redirect to the target URL
          return Response.redirect(
            redirectTarget.includes("http://") ||
              redirectTarget.includes("https://") ||
              redirectTarget.includes("www")
              ? redirectTarget
              : `${context.url.origin}${redirectTarget}`,
            statusCode
          );
        }
      }

      // Authentication logic
      const authCookie = context.cookies.get("_token")?.value;
      const pathname = context.url.pathname;
      const dashboardIndex = pathname.split("/").indexOf("dashboard");
      const authenticationIndex = pathname.split("/").indexOf("authentication");

      if (
        authCookie &&
        (authenticationIndex === 2 || authenticationIndex === 1)
      ) {
        return Response.redirect(
          new URL(`${import.meta.env.BASE_URL}dashboard/`, context.url),
          302
        );
      }
      if (!authCookie && (dashboardIndex === 2 || dashboardIndex === 1)) {
        return Response.redirect(
          new URL(
            `${import.meta.env.BASE_URL}authentication/login/`,
            context.url
          ),
          302
        );
      }

      // return a Response or the result of calling `next()`
      return next();
    } catch (error) {
    console.error("Error during request handling:", error);
    return new Response("Internal Server Error", { status: 500 });
    }
});