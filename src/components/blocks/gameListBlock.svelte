<script lang="ts">
  // First and Third Party Components
  import qs from "qs";
  // Stores
  import { getTranslations } from "../../../stores/addTranslations.ts";
  import { gameVariables, games, gamesQsStore } from "../../../stores/games.ts";
  import { sortOptions } from "../../../stores/sortFilters.ts";
// Components
  import DesktopGameFilter from "../filters/desktopGameFilter.svelte";
  import MobileGameFilter from "../filters/mobileGameFilter.svelte";
  import GameCard from "../games/gameCard.svelte";
// Helpers
  import { gamesQs } from "../../../qs/games.ts";
// Types
  import type {
    CustomGameList,
    TProviderAttributesOnly,
    TranslationData,
  } from "../../../interfaces/common/types.ts";
  import type {
    TUserGame,
    TUserGameProvider,
  } from "../../../interfaces/games.ts";
  import { providers } from "../../../stores/casinos.ts";

  export let data: CustomGameList;
  export let author: string = "";
  export let page = 1;
  export let initialGames: TUserGame[] = [];
  export let gameProviders: TProviderAttributesOnly[] = [];
  export let slotCategories: TUserGameProvider[] = [];
  export let translations: TranslationData = {};
  export let slotProviders: TProviderAttributesOnly[] = [];

  // Get provider slugs
  const providerSlugs = data.gameProviders.map(
    (game: any) => game.slotProvider.data.attributes.slug
  );

  // Get Category Slugs
  const categorySlugs = data?.gameCategories.map(
    (game: any) => game.slotCategories.data.attributes.slug
  );

  // Set Game Variables for API Call
  gameVariables.setKey("limit", data.numberOfGames);
  gameVariables.setKey("sort", $sortOptions[data.sortBy] || "ratingAvg:desc");
  gameVariables.setKey("providers", providerSlugs);
  gameVariables.setKey("categories", categorySlugs);
  gameVariables.setKey("author", author);
  gameVariables.setKey("page", page);

  // Create QS String from the updated variables
  // const query = qs.stringify(gamesQs($gameVariables), {
  //   encodeValuesOnly: true,
  // });
  // gamesQsStore.set(`?${query}`);

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
    getTranslations.set(translations);
    providers.set(slotProviders);
    if (!$games.loading) {
      genericGame =
        $games?.data?.data?.map((game) => {
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
            categories:
              game.attributes.categories.data.map((category) => {
                return { title: category.attributes.title as string };
              }) ?? [],
          };
          return newGame;
        }) ?? [];
    }
  }
</script>

<div>
  <div class="flex flex-col align-center relative xl:container px-2 pb-5 z-20">
    <MobileGameFilter {page} {slotCategories} translationStore={translations}/>
    <DesktopGameFilter
      {page}
      showGameFilterPanel={data.showGameFilterPanel}
      {gameProviders}
      {slotCategories}
      {translations}
    />
    <div class="[&>*]:px-[6px] -mx-[6px] flex flex-wrap justify-center gap-y-3">
      {#if initialGames.length && !genericGame.length}
        {#each initialGames as game}
          <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <GameCard {game} translations={translations} />
          </div>
        {/each}
      {:else if !$games.loading}
        {#each genericGame as game}
          <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <GameCard {game} translations={translations} />
          </div>
        {/each}
      {:else}
        {#each { length: data.numberOfGames } as _}
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
        {translations?.loadMore?.toUpperCase()}
      </button>
    {/if}
  </div>
</div>
