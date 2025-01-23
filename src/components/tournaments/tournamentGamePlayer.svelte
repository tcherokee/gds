<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../../stores/authStore";
  import type { TUser } from "../../../interfaces/auth";
  import type {
    PlayerResults,
    Scoreboard,
    Tournament,
  } from "../../../interfaces/tournaments";

  export let tournamentId: number;
  export let tournament: Tournament;
  let gameURL = "";
  let loader = false;
  let iframeElement: any;
  let playerToken = "";
  let apiUrl = "";
  let currentTab: "position" | "leaderboard" = "position";
  let playerResultsLoader = false;
  let playerResults: PlayerResults;
  let userScoreBoard: Scoreboard;

  function receiveMessage(event: any) {
    if (event.data.name === "gameRoundEnded") {
      getPlayerResults();
      getTournamentLeaderboard();
    }
  }

  const getPlayerResults = async () => {
    playerResultsLoader = true;
    const playerResultsResponse = await fetch(
      `${import.meta.env.BASE_URL}api/pragmatic-api/get-player-results?`,
      {
        method: "POST",
        body: JSON.stringify({
          token: playerToken,
          apiUrl,
        }),
      }
    );
    playerResults = await playerResultsResponse.json();
    if (playerResults) {
      const username = ($user as unknown as TUser)?.username;
      userScoreBoard = playerResults.scoreboard.find(
        ({ name }) => name === username
      ) as Scoreboard;
    }
    playerResultsLoader = false;
  };

  const getSessionData = async () => {
    const username = ($user as unknown as TUser)?.username;
    const sessionDataResponse = await fetch(
      `${import.meta.env.BASE_URL}api/pragmatic-api/get-session-data?` +
        new URLSearchParams({
          tournament_id: tournamentId.toString(),
          username,
        })
    );
    const sessionData = await sessionDataResponse.json();
    apiUrl = sessionData.data.apiURL;
    playerToken = sessionData.data.token;
  };

  const getTournamentLeaderboard = async () => {
    const username = ($user as unknown as TUser)?.username;
    const tournamentLeaderboardResponse = await fetch(
      `${import.meta.env.BASE_URL}api/pragmatic-api/get-tournament-leaderboard?` +
        new URLSearchParams({
          tournament_id: tournamentId.toString(),
          username,
        })
    );
    const response = await tournamentLeaderboardResponse.json();
  };

  const startTournamentGameHandler = async () => {
    const username = ($user as unknown as TUser)?.username;
    const startGameResponse = await fetch(
      `${import.meta.env.BASE_URL}api/pragmatic-api/start-game`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          tournamentId,
        }),
      }
    );
    const res = await startGameResponse.json();
    gameURL = res.data.gameURL;
    return res.data.gameURL;
  };

  onMount(async () => {
    loader = true;
    const [gameUrlData] = await Promise.all([startTournamentGameHandler()]);
    gameURL = gameUrlData;
    window.addEventListener("message", receiveMessage, false);
    loader = false;
    await getSessionData();
    // await getTournamentLeaderboard();
    await getPlayerResults();
  });
</script>

<div class="flex flex-col md:flex-row">
  <!-- Game Container -->
  <div class="flex-1 w-full md:w-3/4">
    <div class="md:h-[600px] w-full aspect-[16/9] bg-black">
      {#if loader}
        <div class="w-full h-full flex justify-center items-center">
          <div class="custom-spinner" aria-hidden="true" />
        </div>
      {:else}
        <iframe
          src={gameURL}
          width="100%"
          height="100%"
          name={tournament?.name}
          title={tournament?.name}
          bind:this={iframeElement}
        />
      {/if}
    </div>
    <div
      class="bg-white md:rounded-bl-lg flex justify-between items-center py-3 px-2.5"
    >
      <div class="">{tournament?.name}</div>
    </div>
  </div>

  <!-- Sidebar -->
  <div
    class="w-full md:w-1/4 grid [&>*]:col-start-1 [&>*]:row-start-1 rounded-lg md:rounded-none md:rounded-br-lg overflow-hidden"
  >
    {#if playerResultsLoader && !playerResults}
      <div class="w-full h-full flex justify-center items-center">
        <div class="custom-spinner" aria-hidden="true" />
      </div>
    {/if}
    <div class="bg-tournament-card-bg-gradient"></div>
    <img
      src="/it/fire-portals-background.jpg"
      alt="Fire Portals Background"
      class="w-full h-full object-cover"
    />
    {#if playerResults}
      <div class="flex flex-col justify-between">
        <!-- Tab Content -->
        <div class="md:h-[600px] max-h-[400px] md:max-h-[600px] p-4 overflow-y-scroll order-1 md:order-0">
          {#if currentTab === "position"}
            <!-- Position Tab -->
            <div class="space-y-4">
              <div class="rounded-lg p-4">
                <div class="text-yellow-400 text-sm mb-1">Score</div>
                <div class="text-white text-2xl font-bold">
                  {playerResults?.score || 0}
                </div>
              </div>
              <div class="rounded-lg p-4">
                <div class="text-sm mb-1">Rank</div>
                <div class="text-white text-2xl font-bold">
                  #{playerResults?.position || 0}
                </div>
              </div>
              <div class="rounded-lg p-4">
                <div class="text-sm mb-1">Total Spins</div>
                <div class="text-white text-2xl font-bold">
                  {userScoreBoard?.spins_taken}/{tournament?.spins}
                </div>
              </div>

              <div class="rounded-lg p-4">
                <div class="text-yellow-400 text-sm mb-1">Daily Spins</div>
                <div class="text-white text-2xl font-bold">
                  {playerResults?.remainingSpinsForADay}/{tournament?.dailySpins}
                </div>
              </div>
            </div>
          {:else}
            <!-- Leaderboard Tab -->
            <div class="space-y-2 -mx-4 relative">
              {#each playerResults?.scoreboard as scoreboard, i}
                <div
                  class="py-1.5 px-4 flex items-center justify-between"
                  class:bg-tournament-card-labels={scoreboard.name === $user?.username}
                  class:sticky={scoreboard.name === $user?.username}
                >
                  <div class="flex items-center gap-3">
                    <span class="text-white font-medium"
                      >#{scoreboard.position}</span
                    >
                    <span class="text-white">{scoreboard.name}</span>
                  </div>
                  <div class="text-white font-bold">{scoreboard.score}</div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Tab Navigation -->
        <div class="flex order-0 md:order-1">
          <button
            class="flex-1 py-3 text-center text-base font-medium transition-colors"
            class:text-white={currentTab === "position"}
            class:text-gray-400={currentTab !== "position"}
            on:click={() => (currentTab = "position")}
          >
            Position
          </button>
          <button
            class="flex-1 py-3 text-center text-base font-medium transition-colors"
            class:text-white={currentTab === "leaderboard"}
            class:text-gray-400={currentTab !== "leaderboard"}
            on:click={() => (currentTab = "leaderboard")}
          >
            Leaderboard
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Add any additional styles here */
</style>
