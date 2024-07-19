<script lang="ts">
  import type { TranslationData } from "../../../interfaces/common/types.ts";
  import type { Game, TUserGame } from "../../../interfaces/games.ts";
  import GameCard from "./gameCard.svelte";
  export let relatedGames: Game[];
  export let translations: TranslationData = {};
  const transformedGames: TUserGame[] = relatedGames.map((elem) => {
    return {
      ...elem.attributes,
      images: {
        url: elem.attributes.images.data.attributes.url,
      },
      categories: [],
      provider: {
        slug: elem.attributes.provider.data?.attributes.slug as string,
        title: elem.attributes.provider.data?.attributes.title as string,
      },
    };
  });
  let limitGames = transformedGames.slice(0, 6);
  let relatedGamesPage = 1;

  const loadMoreRelatedGames = () => {
    limitGames = [...limitGames, ...transformedGames.slice(relatedGamesPage * 6, (relatedGamesPage * 6) + 6)]
    relatedGamesPage++;
  };
</script>

<div class="space-y-4">
  <div class="glass-wrapper">
    <div class="relative xl:container px-2 z-20">
      <div
        class="[&>*]:px-[6px] -mx-[6px] flex flex-wrap justify-center gap-y-3"
      >
        {#each limitGames as game}
          <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <GameCard {game} {translations} />
          </div>
        {/each}
      </div>
    </div>
  </div>
  {#if relatedGames.length > limitGames.length}
    <div class="flex justify-center mt-10">
      <button
        on:click={loadMoreRelatedGames}
        class="btn btn-secondary uppercase text-white w-[130px] mb-3"
      >
        {translations.loadMore.toUpperCase()}
      </button>
    </div>
  {/if}
</div>
