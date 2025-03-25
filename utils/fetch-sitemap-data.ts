// src/utils/fetchPaginatedData.ts
import qs from "qs";
import fetchApi from "../lib/strapi";

export const sitemapPageQs = (
  fields: string[],
  filters: any,
  page: number,
  pageSize: number
) => ({
  fields,
  filters,
  sort: ["id:asc"],
  pagination: {
    page: 1,
    pageSize,
  },
});

const sitemapEndpointMap = {
  users: {
    fields: ["firstName", "lastName"],
    filters: {
      isAnAuthor: {
        $eq: true,
      },
    },
    endpoint: "users",
    path: "author",
  },
  casinos: {
    fields: ["slug", "title"],
    filters: {},
    endpoint: "casinos",
    path: "casino/recensione",
  },
  "casino-providers": {
    fields: ["slug", "title"],
    filters: {},
    endpoint: "casino-providers",
    path: "casino-online",
  },
  "casino-live": {
    fields: ["urlPath", "title"],
    filters: {
      pageType: {
        $eq: "CASINO_LIVE",
      },
    },
    endpoint: "custom-pages",
    path: "",
  },
  "custom-pages": {
    fields: ["urlPath", "title"],
    filters: {
      $and: [
        {
          urlPath: {
            $ne: "sitemap",
          },
        },
        {
          $or: [
            {
              pageType: {
                $eq: "GUIDA_CASINO",
              },
            },
            {
              pageType: {
                $null: true,
              },
            },
          ],
        },
      ],
    },
    endpoint: "custom-pages",
    path: "",
  },
  "slot-categories": {
    fields: ["slug", "title"],
    filters: {},
    endpoint: "slot-categories",
    path: "slot-machine",
  },
  "slot-providers": {
    fields: ["slug", "title"],
    filters: {},
    endpoint: "slot-providers",
    path: "software-slot-machine",
  },
  games: {
    fields: ["slug", "title"],
    filters: {},
    endpoint: "games",
    path: "slot-machines",
  },
};

export async function fetchSitemapData(
  totalRecords: number[],
  page = 1,
  lastRecordId: number | null = null,
  pageSize = 150
) {
  const sitemapEndpointKeys = Object.keys(sitemapEndpointMap) as Array<
    keyof typeof sitemapEndpointMap
  >;

  try {
    let startIndex = (page - 1) * pageSize;
    let remainingItems = pageSize;
    let cumulativeTotal = 0;
    let results: any[] = [];
    let usedEndpoints: string[] = [];
    let newLastRecordId: number | null = lastRecordId; // Track last ID

    for (let i = 0; i < sitemapEndpointKeys.length; i++) {
      let endpointTotal = totalRecords[i];
      let previousTotal = cumulativeTotal;
      cumulativeTotal += endpointTotal;

      // If the startIndex falls within this endpoint
      if (startIndex < cumulativeTotal) {
        let selectedSitemapKey = sitemapEndpointKeys[i];
        let selectedEndpoint = sitemapEndpointMap[selectedSitemapKey].endpoint;
        let adjustedStartIndex = startIndex - previousTotal;
        let adjustedPage = Math.floor(adjustedStartIndex / pageSize) + 1;

        while (remainingItems > 0) {
          // Determine how many records can be fetched from this endpoint
          let availableRecords = endpointTotal - (adjustedPage - 1) * pageSize;
          let currentPageSize = Math.min(remainingItems, availableRecords);

          if (currentPageSize <= 0) break; // No more records left in this endpoint

          const endpointQuery = qs.stringify(
            sitemapPageQs(
              sitemapEndpointMap[selectedSitemapKey].fields,
              {
                ...sitemapEndpointMap[selectedSitemapKey].filters,
                ...(lastRecordId &&
                  remainingItems === pageSize && { id: { $gt: lastRecordId } }),
              },
              adjustedPage,
              currentPageSize
            ),
            { encodeValuesOnly: true }
          );

          // Fetch data from the selected endpoint
          const result = await fetchApi<any[]>({
            endpoint: selectedEndpoint,
            wrappedByKey: `${selectedEndpoint !== "users" ? "data" : ""}`,
            query: `?${endpointQuery}`,
          });

          // Stop fetching if no data is returned
          if (result.length === 0) {
            break;
          }

          const modifiedResult = result.map((item) => {
            let baseUrl = `${import.meta.env.PUBLIC_FULL_URL}/${sitemapEndpointMap[selectedSitemapKey].path}`;
            if (selectedEndpoint === "users") {
              return {
                url: `${baseUrl}/${item.firstName.toLowerCase()}.${item.lastName.toLowerCase()}/`,
                title: `${item.firstName} ${item.lastName}`,
                endpoint: selectedEndpoint,
                id: item.id,
              };
            }
            if (selectedEndpoint === "custom-pages") {
              return {
                url: `${baseUrl}${item.attributes.urlPath}/`,
                title: removeGratis(item.attributes.title),
                endpoint: selectedSitemapKey,
                id: item.id,
                type:
                  selectedSitemapKey === "casino-live"
                    ? "CASINO_LIVE"
                    : "GUIDA_CASINO",
              };
            }
            return {
              url: `${baseUrl}/${item.attributes.slug}/`,
              title: sitemapAnchorTextResolver(
                selectedEndpoint,
                removeGratis(item.attributes.title)
              ),
              endpoint: selectedEndpoint,
              id: item.id,
            };
          });

          results.push(...modifiedResult);
          usedEndpoints.push(selectedEndpoint);
          remainingItems -= result.length;
          newLastRecordId = result[result.length - 1]?.id || newLastRecordId;

          // If we still need more data, move to the next endpoint
          if (remainingItems > 0) {
            if (i + 1 < sitemapEndpointKeys.length) {
              selectedSitemapKey = sitemapEndpointKeys[++i];
              selectedEndpoint =
                sitemapEndpointMap[selectedSitemapKey].endpoint;
              adjustedPage = 1; // Reset page for new endpoint
              endpointTotal = totalRecords[i];
            } else {
              break; // No more endpoints left
            }
          }
        }
        break; // Stop after collecting enough records
      }
    }

    if (results.length === 0) {
      return { error: "Page number exceeds total records." };
    }

    return {
      page,
      data: results, // Ensure exactly `pageSize` items are returned
      pageSize: results.length,
      lastRecordId: newLastRecordId,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

const sitemapAnchorTextResolver = (endpoint: string, title: string): string => {
  switch (endpoint) {
    case "casinos":
      return `Recensione ${title}`;
    case "casino-providers":
      return `${title} Casino Online`;
    case "games":
      return `${title} Slot`;
    case "slot-categories":
      return `Slot Machine ${title}`;
    case "slot-providers":
      return `${title} Slot machines`;
    default:
      return title;
  }
};

const removeGratis = (title: string): string => {
  return title
    .replace(/\bgratis\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
};
