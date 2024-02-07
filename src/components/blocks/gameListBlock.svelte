<script lang="ts">
  // First and Third Party Components
  import qs from "qs";

  import { filterProviders } from "../../../qs/layout.ts";

  // Stores
  import { sortOptions } from "../../../stores/sortFilters.ts";
  import { gameVariables, games, gamesQsStore } from "../../../stores/games.ts";
  import { getTranslations } from "../../../stores/addTranslations.ts";

  // Components
  import GameCard from "../games/gameCard.svelte";
  import DesktopGameFilter from "../filters/desktopGameFilter.svelte";
  import MobileGameFilter from "../filters/mobileGameFilter.svelte";

  // Helpers
  import { gamesQs } from "../../../qs/games.ts";
  import MediaQuery from "../helpers/mediaQuery.svelte";

  // Types
  import type { Game, TUserGame } from "../../../interfaces/games.ts";
  import type { TranslationData } from "../../../interfaces/common/types.ts";

  export let data;

  // Get provider slugs
  const providerSlugs = data.gameProviders.map(
    (game) => game.slotProvider.data.attributes.slug
  );

  // Get Category Slugs
  const categorySlugs = data.gameCategories.map(
    (game) => game.slotCategories.data.attributes.slug
  );

  export let translations: TranslationData;

  // Set Game Variables for API Call
  gameVariables.setKey("limit", data.numberOfGames);
  gameVariables.setKey("sort", $sortOptions[data.sortBy] || "ratingAvg:desc");
  gameVariables.setKey("providers", providerSlugs);
  gameVariables.setKey("categories", data.gameCategories);

  // Create QS String from the updated variables
  const query = qs.stringify(gamesQs($gameVariables), {
    encodeValuesOnly: true,
  });
  gamesQsStore.set(`?${query}`);

  const loadMoreGames = () => {
    gameVariables.setKey("limit", $gameVariables.limit + data.numberOfGames);

    // Create QS String from the updated variables
    const query = qs.stringify(gamesQs($gameVariables), {
      encodeValuesOnly: true,
    });
    gamesQsStore.set(`?${query}`);
  };
  let genericGame: TUserGame[] = [];

  $: {
    if (!$games.loading) {
      genericGame = $games?.data?.data?.map((game) => {
        const newGame: TUserGame = {
          id: game.id,
          slug: game.attributes.slug,
          title: game.attributes.title,
          publishedAt: game.attributes.publishedAt,
          ratingAvg: game.attributes.ratingAvg,
          images: {
            url: game.attributes.images.data.attributes.url,
          },
          provider: {
            slug: game.attributes.provider.data.attributes.slug as string,
            title: game.attributes.provider.data.attributes.title as string,
          },
          categories: game.attributes.categories.data.map((category) => {
            return { title: category.attributes.title as string };
          }) ?? [],
        };
        return newGame
      }) ?? [];
    }
  }
  
</script>

<div>
  <div class="flex flex-col align-center relative xl:container px-2 pb-5">
    <MediaQuery query="(max-width: 768px)" let:matches>
      {#if matches}
        <MobileGameFilter showGameFilterPanel={data.showGameFilterPanel} />
      {:else}
        <DesktopGameFilter showGameFilterPanel={data.showGameFilterPanel} />
      {/if}
    </MediaQuery>
    <div class="[&>*]:px-[6px] -mx-[6px] flex flex-wrap justify-center gap-y-3">
      {#if !$games.loading}
        {#each genericGame as game}
          <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <GameCard game={game} translations={translations} />
          </div>
        {/each}
      {:else}
        {#each {length: data.numberOfGames} as _}
          <div class={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6`}>
            <aside
              class="relative cursor-pointer rounded-lg aspect-[235/244] w-full bg-misc/20 transition-shadow duration-[0.3s] sm:cursor-auto"
            />
          </div>  
        {/each}
      {/if}
    </div>
    <!-- Load More Button -->
    {#if data.showGameMoreButton}
      <button
        class="btn self-center mt-5 btn-secondary min-w-[300px] md:min-w-[500px]"
        on:click={loadMoreGames}
      >
        {$getTranslations.loadMore}
      </button>
    {/if}
  </div>
</div>
