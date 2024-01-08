import instantsearch from "instantsearch.js";
import { searchBox, hits, configure } from "instantsearch.js/es/widgets";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

// Define common setup for Meilisearch to reduce redundancy
function setupMeilisearch(noResults, indexName, containerId, resultsId) {
  
  return instantsearch({
    indexName: indexName,
    searchClient: instantMeiliSearch(
      import.meta.env.PUBLIC_MEILISEARCH_HOST,
      import.meta.env.PUBLIC_MEILISEARCH_SEARCH_KEY,
      {
        placeholderSearch: false,
      },
    ).searchClient,
  }).addWidgets([
    searchBox({
      container: containerId,
      cssClasses: {
        root: "relative",
        input: ["hidden"],
      },
      showSubmit: false,
      showLoadingIndicator: false,
      showReset: false,
    }),
    hits({
      container: resultsId,
      cssClasses: {
        list: ["mt-3", "grid", "grid-cols-1", "gap-2", "lg:grid-cols-2"],
      },
      transformItems(items) {
        // Error handling if the logo URL is incorrect or missing
        return items.map((item) => {
          const logoUrl = item.logo?.includes(".com")
            ? `${import.meta.env.PUBLIC_ROOT_DOMAIN}/65x60/filters:quality(80)` +
              item.logo.substring(item.logo.indexOf(".com") + 4)
            : "default-logo-url"; // Provide a default logo URL or path
          return {
            ...item,
            logo: logoUrl,
          };
        });
      },
      templates: {
        // Template literals could be extracted to a function to avoid redundancy
        item(hit, { html, components }) {
          return html`<a class="col-span-1 flex rounded-md shadow-sm" href=https://www.giochidislots.com/it/slot-machine/${
            hit.slug
          } data-sveltekit-reload>
							<div class="flex justify-items-start overflow-hidden w-16 flex-shrink-0 items-center justify-center rounded-l-md border-grey-300 border-l border-t border-b">
								<img src=${hit.logo} class=""/>
							</div>
							<div class="flex flex-1 items-center justify-between truncate rounded-r-md border-t text-black border-r border-b border-grey-300 bg-white">
								<div class="flex flex-1 flex-col truncate px-4 py-1 text-sm leading-tight">
									<div class="font-medium uppercase text-left text-xs">
										${components.Highlight({
                      hit,
                      attribute: "title",
                    })}
									</div>
									<div class="text-left text-[8px] m-0 mt-px">
										<span class="uppercase mr-2">Categorie</span>
										${components.Snippet({
                      hit,
                      attribute: "categoryTitle",
                    })}
									</div>
									<div class="text-left text-[8px] m-0 mt-px">
										<span class="uppercase mr-2">software</span>${components.Snippet({
                      hit,
                      attribute: "providerTitle",
                    })}
									</div>
									<div class="text-left text-[8px] m-0 mt-px">
										<span class="uppercase mr-2">rating</span>${components.Snippet({
                      hit,
                      attribute: "avgRating",
                    })}/5
									</div>
								</div>
							</div>
						</a>
					`;
        }, // Assuming 'itemTemplate' is a function that returns the template literal
        // empty({ html }) {
        //   // Guard against noResults being undefined or not a function
        //   return html`${noResults ? noResults : "No results found."}`;
        // },
      },
    }),
    configure({ hitsPerPage: 8 }), // Assuming this is common across uses
  ]);
}

// Refactored functions to use the setupMeilisearch function
export const useMeilisearch = (noResults) => {
  const search = setupMeilisearch(
    noResults,
    import.meta.env.PUBLIC_MEILISEARCH_INDEX_NAME,
    "#searchBox",
    "#results",
  );
  search.start();
  return { search };
};

export const useMeilisearchMain = (noResults) => {
  const searchMain = setupMeilisearch(
    noResults,
    import.meta.env.PUBLIC_MEILISEARCH_INDEX_NAME,
    "#searchInput",
    "#hits",
  );
  searchMain.start();
  return { searchMain };
};
