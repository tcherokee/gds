<script lang="ts">
  import AwardIcon from '"~icons/kensho-icons/award';
  import TrophyIcon from '"~icons/kensho-icons/trophy';
  import CircleInfoIcon from '"~icons/kensho-icons/circle-info';
  import XIcon from '"~icons/kensho-icons/x-icon';
  import { onMount, onDestroy } from 'svelte';
  import type { Tournament } from '../../../interfaces/tournaments';

  export let tournament: Tournament;
  let isFlipped = false;
  let currentFace: 'front' | 'info' | 'leaderboard' | 'prizes' = 'front';
  let timeLeft = { hours: 0, mins: 0, secs: 0 };
  let intervalId: number;
  let backgroundImageError = false;
  let logoImageError = false;

  function handleImageError(type: 'background' | 'logo') {
    if (type === 'background') {
      backgroundImageError = true;
    } else {
      logoImageError = true;
    }
  }

  function handleFlip(face: typeof currentFace) {
    if (face === 'front') {
      isFlipped = false;
    } else {
      currentFace = face;
      isFlipped = true;
    }
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const targetTime = tournament.timer * 1000; // Convert to milliseconds
    const distance = targetTime - now;
    
    if (distance < 0) {
      timeLeft = { hours: 0, mins: 0, secs: 0 };
      clearInterval(intervalId);
      return;
    }
    
    timeLeft = {
      hours: Math.floor(distance / (1000 * 60 * 60)),
      mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      secs: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }

  onMount(() => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="relative [perspective:1000px] h-[600px]">
  <div 
    class="absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
    class:rotate-y-180={isFlipped}
  >
    <!-- Front Face -->
    <div class="absolute w-full h-full [backface-visibility:hidden] bg-gray-800 rounded-xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
         class:pointer-events-none={isFlipped}>
      <!-- Challenge Banner -->
      <div class="absolute top-4 left-0 right-0 flex justify-between transition-[z-index] duration-0"
           class:z-10={!isFlipped} class:z-[-1]={isFlipped}>
        <div class="bg-yellow-500 text-gray-900 py-3 px-4 rounded-r-full font-bold flex items-center text-sm">
          <TrophyIcon class="w-3.5 h-3.5 mr-2" />
          {tournament.tournamentLabel.toUpperCase()}
        </div>
        <div class="bg-yellow-500 text-gray-900 py-3 px-4 rounded-l-full font-bold text-sm">
          {tournament.betLevel} BET LEVEL
        </div>
      </div>

      <!-- Game Image -->
      <div class="relative h-48 overflow-hidden bg-gray-900">
        {#if !backgroundImageError}
          <img 
            src={tournament.backgroundImage} 
            alt={tournament.gameTitle}
            class="w-full h-full object-cover"
            on:error={() => handleImageError('background')}
          />
        {:else}
          <div class="w-full h-full flex items-center justify-center">
            <!-- <ImageIcon class="w-12 h-12 text-gray-600" /> -->
          </div>
        {/if}
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/90"></div>
        {#if !logoImageError}
          <img 
            src={tournament.logoImage} 
            alt={tournament.name}
            class="absolute bottom-4 left-4 h-12 object-contain"
            on:error={() => handleImageError('logo')}
          />
        {/if}
      </div>

      <!-- Tournament Info -->
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <div class="text-3xl font-bold text-yellow-500">{tournament.prizePool}</div>
            <div class="text-gray-400">Prize Pool</div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold">{tournament.spins}</div>
            <div class="text-gray-400">Spins</div>
          </div>
        </div>

        <!-- Timer -->
        <div class="mb-6">
          <div class="text-gray-400 mb-2">{tournament.scheduleTimerTitle === 'ends_in' ? 'Ends in:' : 'Starts in:'}</div>
          <div class="bg-gray-900/50 rounded-lg p-4">
            <div class="flex justify-center items-center space-x-2 text-3xl font-bold">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.mins).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.secs).padStart(2, '0')}</span>
            </div>
            <div class="flex justify-center items-center space-x-8 mt-1 text-sm text-gray-400">
              <span>HOURS</span>
              <span>MINS</span>
              <span>SECS</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <button class="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all mb-4">
          {tournament.actionButton.label.toUpperCase()}
        </button>

        <div class="flex justify-center space-x-6 text-gray-400 text-sm">
          <button 
            on:click={() => handleFlip('info')}
            class="flex items-center hover:text-yellow-500 transition-colors"
          >
            <CircleInfoIcon class="w-4 h-4 mr-1.5" />
            Information
          </button>
          <button 
            on:click={() => handleFlip('leaderboard')}
            class="flex items-center hover:text-yellow-500 transition-colors"
          >
            <TrophyIcon class="w-4 h-4 mr-1.5" />
            Leaderboard
          </button>
          <button 
            on:click={() => handleFlip('prizes')}
            class="flex items-center hover:text-yellow-500 transition-colors"
          >
            <AwardIcon class="w-4 h-4 mr-1.5" />
            Prizes
          </button>
        </div>
      </div>
    </div>

    <!-- Back Face -->
    <div class="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800 rounded-xl overflow-hidden border border-yellow-500/20">
      <button 
        on:click={() => handleFlip('front')}
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
      
      {#if currentFace === 'info'}
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Tournament Information</h3>
          <div class="space-y-4">
            <p><strong>Game:</strong> {tournament.gameTitle}</p>
            <p><strong>Bet Level:</strong> {tournament.betLevel}</p>
            <p><strong>Required Spins:</strong> {tournament.spins}</p>
            {#if tournament.dailySpins}
              <p><strong>Daily Spins:</strong> {tournament.dailySpins}</p>
            {/if}
            <div class="text-sm text-gray-400 mt-4">
              {@html tournament.terms}
            </div>
          </div>
        </div>
      {:else if currentFace === 'leaderboard'}
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Current Leaders</h3>
          <div class="space-y-3">
            {#each tournament.scoreboard as entry}
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="w-8 text-yellow-500 font-bold">#{entry.position}</span>
                  <span>{entry.name}</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="font-bold">{entry.score}</span>
                  {#if entry.prize}
                    <span class="text-yellow-500">{entry.prize}</span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentFace === 'prizes'}
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Prize Structure</h3>
          <div class="space-y-3">
            {#each tournament.prizePoolList as prize}
              <div class="flex items-center justify-between">
                <span class="text-yellow-500 font-bold">Position {prize.range}</span>
                <span class="font-bold">{prize.prize}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
</style>