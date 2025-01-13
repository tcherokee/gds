<script lang="ts">
  import { onMount } from 'svelte';
  import type { Tournament } from '../../../interfaces/tournaments';
  import { tournamentApi } from "../../../lib/tournamentapi.ts"

  // Props
  export let tournament: Tournament | null = null;
  
  // Local state
  let loading = true;
  let error: string | null = null;
  let tournaments: Tournament[] = [];

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fetch tournament data
  async function fetchTournaments() {
    try {
      loading = true;
      error = null;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN,
        License: import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY,
        };

        console.log('headers', headers);

        // Log the complete request details
        console.group('🚀 Tournament API Request');
        console.log('Endpoint/Headers:', `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}getTournamentFullSchedule`, headers);
        
        const response = await fetch(`${import.meta.env.PUBLIC_TOURNAMENT_API_URL}getTournamentFullSchedule/`, {
            method: 'GET',
            headers,
        });

        console.log('response', response);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to load tournaments');
      }

      tournaments = response.data;
      
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      error = err instanceof Error ? err.message : 'Failed to load tournaments';
    } finally {
      loading = false;
    }
  }

  // Load data when component mounts
  onMount(() => {
    fetchTournaments();
  });
</script>

<!-- Loading State -->
{#if loading}
  <div class="flex items-center justify-center p-8">
    <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
{:else if error}
  <!-- Error State -->
  <div class="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
    {error}
  </div>
{:else}
  <!-- Tournament Cards -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each tournaments as tournament}
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Tournament Header -->
        <div class="relative h-48">
          <img
            src={tournament.backgroundImage}
            alt={tournament.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <img
            src={tournament.logoImage}
            alt="{tournament.name} logo"
            class="absolute bottom-4 left-4 h-12 w-auto"
          />
        </div>

        <!-- Tournament Details -->
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">{tournament.name}</h3>
          
          <div class="space-y-4">
            <!-- Tournament Status -->
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Status</span>
              <span class="font-medium">
                <span
                  class={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium
                  ${tournament.isLive ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
                >
                  {tournament.isLive ? "Live" : "Upcoming"}
                </span>
              </span>
            </div>

            <!-- Tournament Dates -->
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Start Date</span>
              <span class="font-medium">{formatDate(tournament.startDate)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">End Date</span>
              <span class="font-medium">{formatDate(tournament.endDate)}</span>
            </div>

            <!-- Prize Pool -->
            <div class="border-t pt-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Prize Pool</span>
                <span class="font-bold text-emerald-600">{tournament.prizePool}</span>
              </div>
            </div>

            <!-- Action Button -->
            {#if tournament.actionButton}
              <button
                class="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg transition-colors hover:bg-primary-dark"
                disabled={!tournament.actionButton.clickable}
              >
                {tournament.actionButton.label}
              </button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>