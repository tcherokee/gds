<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import type { Tournament } from "../../../interfaces/tournaments";
  import TournamentCard from "./tournamentCard.svelte";
  import Close from "~icons/kensho-icons/xmark"

  export let liveTournaments: Tournament[] = [];
  let currentUserTournamentsLoader = false;
  let currentUserTournaments: Record<string, Tournament> = {};
  let selectedTournament: Tournament | null = null;
  let gameURL: string | null = null;
  let iframeElement: any;

  const getUserTournamentHistory = async () => {
    currentUserTournamentsLoader = true;
    const tournamentHistoryResponse = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/pragmatic-api/get-tournament-history`
    );
    if (tournamentHistoryResponse.ok) {
      const res = await tournamentHistoryResponse.json();
      console.log("userTournamentHistory", res.data);
      // Update currentUserTournaments after getting new history
      updateCurrentUserTournaments(res.data);
      currentUserTournamentsLoader = false;
    }
  }

  const updateCurrentUserTournaments = (userTournamentHistory: Tournament[]) => {
    currentUserTournaments = userTournamentHistory.reduce((acc, tournament) => {
      acc[tournament.tournamentId] = tournament;
      return acc;
    }, {} as Record<string, Tournament>);
    console.log("CURRENT_USER_TOURNAMENTS", currentUserTournaments);
  };

  const handleTournamentSelected = (event: CustomEvent<{ tournament: Tournament, gameURL: string }>) => {
    selectedTournament = event.detail.tournament;
    gameURL = event.detail.gameURL;
    if (!currentUserTournaments[selectedTournament.tournamentId]) {
      getUserTournamentHistory();
    }
    console.log('Selected Tournament ID:', selectedTournament, gameURL);
  };

  const dismissTournamentGame = () => {
    selectedTournament = null;
    gameURL = null;
  }

  onMount(async () => {
    const response = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/get-auth-cookie/`
    );
    const { hasPPToken } = await response.json();
    // console.log("PP_TOKEN", hasPPToken);
    // console.log("AUTH_TOKEN", hasAuthCookkie);
    if (hasPPToken) {
      getUserTournamentHistory();
    }
  });
</script>

{#if currentUserTournamentsLoader}
  <div class="flex justify-center items-center h-screen">
    <p class="text-2xl font-bold">Loading...</p>
  </div>
{:else}
  {#if !gameURL}
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold mb-12 text-center">
        {liveTournaments[0]?.name || "Active Tournaments"}
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each liveTournaments as tournament, i (tournament.tournamentId)}
          <TournamentCard 
            tournament={tournament} 
            userTournament={currentUserTournaments[tournament.tournamentId]}
            on:tournamentSelected={handleTournamentSelected}
          />
        {/each}
      </div>
    </div>
  </section>
  {:else}
  <div class="">
    <div class="bg-white rounded-t-lg flex justify-between items-center py-3 px-2.5">
      <div class="">{selectedTournament?.name}</div>
      <button class="cursor-pointer" on:click={dismissTournamentGame}>
				<Close width="24px" height="24px" />
			</button>
    </div>
    <div class="md:h-[700px] w-full aspect-[16/9] bg-black">
      <iframe src={gameURL} width="100%" height="100%" name={selectedTournament?.name} title={selectedTournament?.name} bind:this={iframeElement} />
    </div>
  </div>
  {/if}
{/if}
