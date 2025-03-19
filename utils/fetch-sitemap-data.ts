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
    path: "author",
  },
  casinos: {
    fields: ["slug", "title"],
    filters: {},
    path: "casino/recensione",
  },
  "casino-providers": {
    fields: ["slug", "title"],
    filters: {},
    path: "casino-online",
  },
  "custom-pages": {
    fields: ["urlPath", "title"],
    filters: {},
    path: "",
  },
  "slot-categories": {
    fields: ["slug", "title"],
    filters: {},
    path: "slot-machine",
  },
  "slot-providers": {
    fields: ["slug", "title"],
    filters: {},
    path: "software-slot-machine",
  },
  games: {
    fields: ["slug", "title"],
    filters: {},
    path: "slot-machines",
  },
};

export async function fetchSitemapData(
  totalRecords: number[],
  page = 1,
  lastRecordId: number | null = null,
  pageSize = 150
) {
  const sitemapEndpoints = Object.keys(sitemapEndpointMap) as Array<
    keyof typeof sitemapEndpointMap
  >;

  try {
    let startIndex = (page - 1) * pageSize;
    let remainingItems = pageSize;
    let cumulativeTotal = 0;
    let results: any[] = [];
    let usedEndpoints: string[] = [];
    let newLastRecordId: number | null = lastRecordId; // Track last ID

    for (let i = 0; i < sitemapEndpoints.length; i++) {
      let endpointTotal = totalRecords[i];
      let previousTotal = cumulativeTotal;
      cumulativeTotal += endpointTotal;

      // If the startIndex falls within this endpoint
      if (startIndex < cumulativeTotal) {
        let selectedEndpoint = sitemapEndpoints[i];
        let adjustedStartIndex = startIndex - previousTotal;
        let adjustedPage = Math.floor(adjustedStartIndex / pageSize) + 1;

        while (remainingItems > 0) {
          // Determine how many records can be fetched from this endpoint
          let availableRecords = endpointTotal - (adjustedPage - 1) * pageSize;
          let currentPageSize = Math.min(remainingItems, availableRecords);

          if (currentPageSize <= 0) break; // No more records left in this endpoint

          const endpointQuery = qs.stringify(
            sitemapPageQs(
              sitemapEndpointMap[selectedEndpoint].fields,
              {
                ...sitemapEndpointMap[selectedEndpoint].filters,
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
            let baseUrl = `${import.meta.env.PUBLIC_FULL_URL}/${sitemapEndpointMap[selectedEndpoint].path}`;
            if (selectedEndpoint === "users") {
              return {
                url: `${baseUrl}/${item.firstName.toLowerCase()}.${item.lastName.toLowerCase()}/`,
                title: `${item.firstName} ${item.lastName}`,
                endpoint: sitemapEndpoints[i],
                id: item.id,
              };
            }
            if (selectedEndpoint === "custom-pages") {
              return {
                url: `${baseUrl}${item.attributes.urlPath}/`,
                title: item.attributes.title,
                endpoint: sitemapEndpoints[i],
                id: item.id,
              };
            }
            return {
              url: `${baseUrl}/${item.attributes.slug}/`,
              title: item.attributes.title,
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
            if (i + 1 < sitemapEndpoints.length) {
              selectedEndpoint = sitemapEndpoints[++i];
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
