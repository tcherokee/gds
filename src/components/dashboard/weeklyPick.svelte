<script lang="ts">
  import GameCard from "../games/gameCard.svelte";
  import { onMount } from "svelte";
  import Loader from "../helpers/loader.svelte";
  import type { TDashboardGame } from "../../../interfaces/games";
  import type { TranslationData } from "../../../interfaces/common/types";

  export let translations: TranslationData;

  let weeklyGames: TDashboardGame[] = [];
  let weeklyPickedLoader = true;

  onMount(async () => {
    weeklyPickedLoader = true;
    const res = await fetch(`${import.meta.env.BASE_URL}api/dashboard/weekly-pick-games/`);
    if (res.ok) {
      weeklyGames = await res.json();
    }
    weeklyPickedLoader = false;
  });
</script>

<div class="px-4">
  <div class="text-xl text-white font-bold font-lato mb-[14px]">
    {translations.pickOfTheWeek}
  </div>
  {#if weeklyPickedLoader}
    <div class="py-10 flex justify-center">
      <Loader />
    </div>
  {:else}
    <div class="dashboard-glass-wrapper p-3">
      {#if weeklyGames.length}
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          {#each weeklyGames as game, index}
            <GameCard game={game.game} {translations} />
          {/each}
        </div>
      {:else}
        <div class="py-12 px-8 space-y-3 flex items-center">
          <div class="text-base text-center text-white font-bold">
            <span class="text-white">Empty</span>
            {translations.emptyMostPlayedGames}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
