// src/pages/sitemap.xml.ts
import type { APIContext, APIRoute } from "astro";
import qs from "qs";
import fetchApi from "../../lib/strapi";
import { authorPageOnlySlugQs } from "../../qs/author";
import { customPageOnlySlugQs } from "../../qs/customPages";

export const dynamicPageQs = () => ({
  fields: ["slug"],
  pagination: {
    page: 1,
    pageSize: 10000,
  },
});

// Returns endpoint query based on endpoint param
const getPageQuery = (endpoint: string): string => {
  let pageQuery = "";
  switch (endpoint) {
    case "users":
      pageQuery = qs.stringify(authorPageOnlySlugQs(), {
        encodeValuesOnly: true,
      });
      break;
    case "blogs":
    case "casinos":
    case "casino-providers":
    case "slot-categories":
    case "games":
    case "slot-providers":
      pageQuery = qs.stringify(dynamicPageQs(), {
        encodeValuesOnly: true,
      });
      break;
    case "custom-pages":
      pageQuery = qs.stringify(customPageOnlySlugQs(), {
        encodeValuesOnly: true,
      });
      break;
    default:
      break;
  }
  return pageQuery;
};

// Example: Fetch your dynamic data
async function getDynamicRoutes(endpoint: string, baseUrl: string) {
  const endpointQuery = getPageQuery(endpoint);
  //   API/database call to get dynamic routes
  //   Game page API call
  const dynamicPages = await fetchApi<any[]>({
    endpoint,
    wrappedByKey: `${endpoint !== "users" ? "data" : ""}`,
    query: `?${endpointQuery}`,
  });
  return dynamicPages.map(
    (res) =>
      `${baseUrl ? `${baseUrl}/` : ""}${endpoint !== "users" && endpoint !== "custom-pages" ? res.attributes.slug : endpoint === "users" ? res.firstName.toLowerCase() + "." + res.lastName.toLowerCase() : res.attributes.urlPath}/`
  );
}

export const GET: APIRoute = async (context: APIContext) => {
  console.log("CONTEXT_SITE:", context.site?.href);
  const authorPageRoutes = await getDynamicRoutes("users", "author");
  const blogPageRoutes = await getDynamicRoutes("blogs", "blog");
  const casinoPageRoutes = await getDynamicRoutes(
    "casinos",
    "casino/recensione"
  );
  const casinoProviderPageRoutes = await getDynamicRoutes(
    "casino-providers",
    "casino-online"
  );
  const slotCategoryRoutes = await getDynamicRoutes(
    "slot-categories",
    "slot-machine"
  );
  const gamePageRoutes = await getDynamicRoutes("games", "slot-machines");
  const slotProviderRoutes = await getDynamicRoutes(
    "slot-providers",
    "software-slot-machine"
  );
  const customPageRoutes = await getDynamicRoutes("custom-pages", "");

  const staticRoutes = [
    "",
    "author/",
    "blog/",
    "contact-us/",
    "slot-machine/miglori/",
    "slot-machine/nuove/",
    "slot-machine/piu-giocate/",
  ];

  const allRoutes = [
    ...staticRoutes,
    ...authorPageRoutes,
    ...blogPageRoutes,
    ...casinoPageRoutes,
    ...casinoProviderPageRoutes,
    ...slotCategoryRoutes,
    ...gamePageRoutes,
    ...slotProviderRoutes,
    ...customPageRoutes,
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${allRoutes
        .map(
          (url) => `
        <url>
          <loc>${import.meta.env.PUBLIC_FULL_URL}/${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;
  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
