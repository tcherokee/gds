<script lang="ts">
  import type { TDashboardGame } from "../../../interfaces/games";
  import {
    getUserFavouriteGames,
    slotMachineUrl,
    userFavouriteGames,
  } from "../../../stores/authStore";
  import Loader from "../helpers/loader.svelte";
  import GameCard from "../games/gameCard.svelte";
  import Link from "../helpers/link.svelte";
  import { onMount } from "svelte";
  import type { TranslationData } from "../../../interfaces/common/types";

  let gamesNotOnUserAccount: Array<any> = [];
  let isSyncingGames = false;

  export let translations: TranslationData;
  let userFavouriteGamesLoader = true;

  const gameSyncHandler = async () => {
    isSyncingGames = true;
    const response = await fetch(`${import.meta.env.BASE_URL}api/dashboard/user-games-add`, {
      method: "POST",
      body: JSON.stringify({
        games: [...gamesNotOnUserAccount.map((game) => game.id)],
      }),
    });

    if (response.ok) {
      getUserFavouriteGames();
      gamesNotOnUserAccount = [];
    }
    isSyncingGames = false;
  };

  onMount(async () => {
    userFavouriteGamesLoader = true;
    const res = await fetch(`${import.meta.env.BASE_URL}api/dashboard/user-games`);
    userFavouriteGamesLoader = false;

    const response = await res.json();
    userFavouriteGames.set([...response]);
    const userFavouritedGames: TDashboardGame[] = [...response];
    const localFavouriteGamesStr =
      await window.localStorage?.getItem("_favourites:");
    const localFavouriteGames = localFavouriteGamesStr
      ? JSON.parse(localFavouriteGamesStr)
      : [];

    for (const localFavouriteGame of localFavouriteGames) {
      const isLocalFavouriteGameInUsersAccount = userFavouritedGames.find(
        ({ game }) => game.id === localFavouriteGame.id
      );
      if (!isLocalFavouriteGameInUsersAccount) {
        gamesNotOnUserAccount = [...gamesNotOnUserAccount, localFavouriteGame];
      }
    }
  });

</script>

<div class="">
  <div class="text-xl text-white font-bold font-lato mb-[14px]">
    Favourite games
  </div>
  {#if userFavouriteGamesLoader}
    <div class="py-10 flex justify-center">
      <Loader />
    </div>
  {:else}
    {#if gamesNotOnUserAccount.length}
      <div class="mb-6">
        <p class="text-base text-white/80">
          {translations.youHave}
          <span class="text-white font-semibold">
            {gamesNotOnUserAccount.length}</span
          >
          {translations.favouriteGamesSync}
        </p>
        <button
          type="button"
          class="flex justify-center items-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          disabled={isSyncingGames}
          on:click={gameSyncHandler}
        >
          {#if isSyncingGames}
            <span class="custom-spinner mr-2" aria-hidden="true"></span>
          {/if}
          <span>{isSyncingGames ? "Syncing games..." : "Sync games"}</span
          ></button
        >
      </div>
    {/if}
    <div class="dashboard-glass-wrapper p-3">
      {#if $userFavouriteGames.length}
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          {#each $userFavouriteGames as game, index}
            <GameCard game={game.game} {translations} />
          {/each}
        </div>
      {:else}
        <div class="py-12 px-8 space-y-3 flex flex-col items-center">
          <div class="text-base text-center text-white font-bold">
            {translations.emptyFavoriteGames}
          </div>
          <Link
            href={`${$slotMachineUrl}/`}
            classes="text-center min-h-[37px] uppercase rounded-md btn-secondary px-4 py-[6px] text-sm font-semibold"
          >
            {translations.seeAllGames}
        </Link>
        </div>
      {/if}
    </div>
  {/if}
</div>
