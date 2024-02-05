<script lang="ts">
  import { onMount } from "svelte";
  import { userMostPlayedGames } from "../../../stores/authStore";
  import GameCard from "../games/gameCard.svelte";
  import Loader from "../helpers/loader.svelte";
  import type { TDashboardGame } from "../../../interfaces/games";

  export let translations: { [key: string]: string };

  let mostPlayedGames: TDashboardGame[] = [];
  let mostPlayedGamesLoader = true;

  onMount(async () => {
    mostPlayedGamesLoader = true;
    const res = await fetch(`/api/dashboard/most-played-games`);
    if (res.ok) {
      mostPlayedGames = await res.json();
    }
    mostPlayedGamesLoader = false;
  });
</script>

<div class="">
  <div class="text-xl text-white font-bold font-lato mb-[14px]">
    {translations.mostPlayed}
  </div>
  {#if mostPlayedGamesLoader}
    <div class="py-10 flex justify-center">
      <Loader />
    </div>
  {:else}
    <div class="dashboard-glass-wrapper p-3">
      {#if mostPlayedGames.length}
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          {#each mostPlayedGames as game, index}
            <GameCard game={game.game} {translations} />
          {/each}
        </div>
      {:else}
        <div class="py-12 px-8 space-y-3 flex flex-col items-center">
          <div class="text-base text-center text-white font-bold">
            {translations.emptyMostPlayedGames}
          </div>
          <!-- <a
          href={data?.menus?.subnavigation?.[0]?.attributes?.url}
          class="text-center min-h-[37px] uppercase rounded-md btn-secondary px-4 py-[6px] text-sm font-semibold"
        >
          {translations.seeAllGames}
        </a> -->
        </div>
      {/if}
    </div>
  {/if}
</div>
