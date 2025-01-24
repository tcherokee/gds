<script lang="ts">
  import { onMount } from "svelte";
  import type { Tournament } from "../../../interfaces/tournaments";
  import TournamentCard from "./tournamentCard.svelte";
  import { user } from "../../../stores/authStore";
  import type { TUser } from "../../../interfaces/auth";
  export let liveTournaments: Tournament[] = [];
  let currentUserTournamentsLoader = false;
  let currentUserTournaments: Record<string, Tournament> = {};

  const getUserTournamentHistory = async () => {
    currentUserTournamentsLoader = true;
    const username = ($user as unknown as TUser)?.username;
    const tournamentHistoryResponse = await fetch(
      `${import.meta.env.PUBLIC_FULL_URL}/api/pragmatic-api/get-tournament-history?username=${username}`
    );
    if (tournamentHistoryResponse.ok) {
      const res = await tournamentHistoryResponse.json();
      if (res.success) {
          console.log("userTournamentHistory", res.data);
          // Update currentUserTournaments after getting new history
          updateCurrentUserTournaments(res.data);
      }
    }
    currentUserTournamentsLoader = false;
  };

  const updateCurrentUserTournaments = (
    userTournamentHistory: Tournament[]
  ) => {
    currentUserTournaments = userTournamentHistory.reduce(
      (acc, tournament) => {
        acc[tournament.tournamentId] = tournament;
        return acc;
      },
      {} as Record<string, Tournament>
    );
    console.log("CURRENT_USER_TOURNAMENTS", currentUserTournaments);
  };

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

<section class="py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold mb-12 text-center">
      {liveTournaments[0]?.name || "Active Tournaments"}
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#if currentUserTournamentsLoader}
      {#each liveTournaments as tournament, i (tournament.tournamentId)}
        <div class="h-[600px] flex justify-center items-center bg-tournament-card-bg-gradient">
          <div class="custom-spinner" aria-hidden="true" />
        </div>
      {/each}
      {:else}
        {#each liveTournaments as tournament, i (tournament.tournamentId)}
          <TournamentCard
            {tournament}
            userTournament={currentUserTournaments[tournament.tournamentId]}
          />
        {/each}
      {/if}
    </div>
  </div>
</section>
