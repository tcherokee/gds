<script lang="ts">
  import { onMount } from "svelte";
  // import { userFavouriteGames } from '$lib/stores/favourite/favourites.store'
  // Icons

  import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
  import UserSvg from "~icons/kensho-dashboard-icons/user";
  import ChatsSvg from "~icons/kensho-dashboard-icons/chats";
  import HourGlassSvg from "~icons/kensho-dashboard-icons/hour-glass";
  import HeartSvg from "~icons/kensho-dashboard-icons/heart";
  import StarSvg from "~icons/kensho-dashboard-icons/star";
  import TrophySvg from "~icons/kensho-dashboard-icons/trophy";

  import GameListItem from "./gameListItem.svelte";
  import Link from "../helpers/link.svelte";

  import {
    user,
    userFavouriteGames,
    weeklyPickedGames,
    userMostPlayedGames,
    slotMachineUrl,
  } from "../../../stores/authStore";
  import type { TDashboardGame } from "../../../interfaces/games";
  import type { TranslationData } from "../../../interfaces/common/types";
  // import { user } from '$lib/stores/auth'
  // export let data: LayoutData
  let favouriteGames: TDashboardGame[] = [];
  // const mostPlayedGames = [...data?.mostPlayedGames].slice(0, 3)
  let weeklyPickGames: TDashboardGame[] = [];
  let mostPlayedGames: TDashboardGame[] = [];
  $: {
    if ($userFavouriteGames.length) {
      favouriteGames = [...$userFavouriteGames].slice(0, 3);
    }
    weeklyPickGames = [...$weeklyPickedGames].slice(0, 3);
    mostPlayedGames = [...$userMostPlayedGames].slice(0, 3);
  }

  export let translations: TranslationData;

  const fetchData = async (endpoint: string) => {
    const res = await fetch(`${endpoint}`);
    if (!res.ok) {
      // throw error(res.status, { message: res.statusText })
    }
    const response = await res.json();
    return response;
  };
  onMount(async () => {
    const authEndpoints = [
      `${import.meta.env.BASE_URL}api/dashboard/user-games`,
      `${import.meta.env.BASE_URL}api/dashboard/most-played-games`,
      `${import.meta.env.BASE_URL}api/dashboard/weekly-pick-games`,
    ];
    const [userGames, mostPlayedGames, pickOfTheWeekGames] = await Promise.all(
      authEndpoints.map((endpoint) => fetchData(endpoint))
    );
    userFavouriteGames.set([...userGames]);
    weeklyPickedGames.set([...pickOfTheWeekGames]);
    userMostPlayedGames.set([...mostPlayedGames]);
  });
</script>

<div class="">
  <div class="dashboard-glass-wrapper">
    <div
      class="h-[200px] rounded-t-xl z-20 {!$user?.cover_image?.url
        ? 'bg-cover-image-wrapper no-repeat bg-cover'
        : ''}"
    >
      {#if $user?.cover_image?.url}
        <img
          class="w-full h-full object-cover rounded-t-xl"
          src={$user?.cover_image?.url}
          alt={$user?.firstName + " cover image"}
        />
      {/if}
    </div>
    <div class="">
      <div class="flex items-center pt-2 pb-5 px-3 z-30 -translate-y-[72px]">
        <div class="items-end gap-x-6 w-full md:flex">
          <div
            class="shrink-0 mx-auto w-[144px] h-[144px] flex justify-center items-center z-30 bg-purple-700 rounded-full border-[2px] border-[#E9F2F8]"
          >
            {#if !$user?.photo}
              <UserPlaceholderSvg class="w-[100px] h-[100px]" />
            {:else}
              <img
                class="w-full h-full object-cover rounded-full"
                src={$user?.photo?.url}
                alt={$user?.firstName + " avatar"}
              />
            {/if}
          </div>
          <div class="justify-between w-full md:flex">
            <div class="mb-4 md:mb-0 text-center md:text-left">
              <div class="text-2xl tracking-[0.96px] text-white font-lato">
                {$user?.firstName}
                {$user?.lastName}
              </div>
              <div class="min-h-[40px] max-w-[320px] text-sm text-white">
                {$user?.bio ? $user?.bio : ""}
              </div>
            </div>
            <div
              class="shrink-0 justify-center flex items-center gap-x-2 h-fit"
            >
              <Link
                href="/dashboard/profile/"
                classes="text-[#7C838D] flex items-center bg-white rounded-[6px] gap-x-[6px] rounded-md py-[6px] px-4 text-sm font-bold"
              >
                <UserSvg class="w-5 h-5" />
                <span>{translations.editProfile}</span>
              </Link>
              <Link
                href="/dashboard/messages/"
                classes="text-[#7C838D] flex items-center bg-white rounded-[6px] gap-x-[6px] rounded-md py-[6px] px-4 text-sm font-bold"
              >
                <ChatsSvg class="w-5 h-5" />
                <span>{translations.message}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="px-3 pt-5 pb-3 -mt-[72px]">
        <div class="gap-2 grid grid-cols-1 md:grid-cols-2">
          <div class="bg-white p-3 rounded-[6px] border border-blue-100">
            <div class="flex items-center gap-x-2">
              <HourGlassSvg class="w-[14px] h-5" />
              <span class="text-blue-700 text-xl font-bold font-lato"
                >{translations.mostPlayed}</span
              >
            </div>
            {#if $userMostPlayedGames.length}
              <div class="mt-2">
                {#each mostPlayedGames as game, index}
                  <div
                    class="py-2 {index < mostPlayedGames.length - 1
                      ? 'border-b border-b-[#CED4DA]'
                      : ''}"
                  >
                    <GameListItem
                      title={game.game.title}
                      imageUrl={game?.game?.images?.url}
                      link={game?.game?.slug}
                    />
                  </div>
                {/each}
              </div>
            {:else}
              <div
                class="flex flex-col items-center justify-center gap-y-3 py-3 h-[calc(100%_-_30px)]"
              >
                <div class="text-sm text-center text-blue-700 font-medium">
                  {translations.emptyMostPlayedGames}
                </div>
                <Link
                  href={`${$slotMachineUrl}/`}
                  classes="text-center w-fit min-h-[37px] uppercase rounded-md btn-secondary px-4 py-[6px] text-sm font-semibold"
                >
                  {translations.seeAllGames}
                </Link>
              </div>
            {/if}

            {#if $userMostPlayedGames?.length > 3}
              <div class="mt-5">
                <Link
                  href="/dashboard/most-played-games/"
                  type="button"
                  classes="register-btn flex w-full justify-center items-center px-3 py-[7px]"
                >
                  VIEW ALL
                </Link>
              </div>
            {/if}
          </div>
          <div class="bg-white p-3 rounded-[6px] border-blue-100">
            <div class="flex items-center gap-x-2">
              <HeartSvg class="w-[22px]" />
              <span class="text-blue-700 text-xl font-bold font-lato"
                >{translations.favouriteGame}</span
              >
            </div>
            {#if favouriteGames.length}
              <div class="mt-2">
                {#each favouriteGames as game, index}
                  <div
                    class="py-2 {index < favouriteGames.length - 1
                      ? 'border-b border-b-[#CED4DA]'
                      : ''}"
                  >
                    <GameListItem
                      title={game.game?.title}
                      imageUrl={game?.game?.images?.url}
                      link={game?.game?.slug}
                    />
                  </div>
                {/each}
              </div>
            {:else}
              <div
                class="flex flex-col items-center justify-center gap-y-3 py-3 h-[calc(100%_-_30px)]"
              >
                <div class="text-sm text-center text-blue-700 font-medium">
                  {translations.emptyFavoriteGames}
                </div>
                <Link
                  href={`${$slotMachineUrl}/`}
                  classes="text-center w-fit min-h-[37px] uppercase rounded-md btn-secondary px-4 py-[6px] text-sm font-semibold"
                >
                  {translations.seeAllGames}
                </Link>
              </div>
            {/if}
            {#if $userFavouriteGames.length > 3}
              <div class="mt-5">
                <Link
                  href="/dashboard/favourite-games/"
                  classes="register-btn flex w-full justify-center items-center px-3 py-[7px]"
                >
                  VIEW ALL
                </Link>
              </div>
            {/if}
          </div>
          <div class="bg-white p-3 rounded-[6px] border-blue-100">
            <div class="flex items-center gap-x-2">
              <StarSvg class="w-[22px] h-5" />
              <span class="text-blue-700 text-xl font-bold font-lato"
                >{translations.pickOfTheWeek}</span
              >
            </div>
            <div class="mt-2">
              {#if weeklyPickGames?.length}
                {#each weeklyPickGames as game, index}
                  <div
                    class="py-2 {index < weeklyPickGames.length - 1
                      ? 'border-b border-b-[#CED4DA]'
                      : ''}"
                  >
                    <GameListItem
                      title={game.game.title}
                      imageUrl={game?.game?.images?.url}
                      link={game?.game?.slug}
                    />
                  </div>
                {/each}
              {:else}
                <div
                  class="flex items-center justify-center gap-y-3 py-3 h-[calc(100%_-_30px)]"
                >
                  <div class="text-sm text-center text-blue-700 font-medium">
                    {translations.emptyWeeklyPick}
                  </div>
                </div>
              {/if}
            </div>
            {#if $weeklyPickedGames?.length > 3}
              <div class="mt-5">
                <Link
                  href="/dashboard/favourite-games/"
                  classes="register-btn flex w-full justify-center items-center px-3 py-[7px] cursor-pointer"
                >
                  VIEW ALL
                </Link>
              </div>
            {/if}
          </div>
          <div class="bg-white p-3 rounded-[6px] border-blue-100">
            <div class="flex items-center gap-x-2">
              <TrophySvg class="w-6" />
              <span class="text-blue-700 text-xl font-bold font-lato"
                >Leaderboard</span
              >
            </div>
            <div class="mt-2">
              <div
                class="flex items-center justify-center gap-y-3 py-3 h-[calc(100%_-_30px)]"
              >
                <div class="text-sm text-center text-blue-700 font-medium">
                  {translations.comingSoon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .cover-image-wrapper {
    background: url("../../icons/dashboard/user-cover-image.svg") center
      no-repeat;
    background-size: cover;
  }
</style>
