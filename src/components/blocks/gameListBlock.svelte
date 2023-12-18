<script>
	// Import Components
	import GamesStore from '$lib/stores/games/games'
	import LoadMoreBtn from '$helpers/loadMore.svelte'
	// import FilterPanel from '$components/filters/GamesFilterPanel.svelte'
	import GameList from '$components/games/GameList.svelte'

	export let block
	export let gamesArray
	export let showGamesFilterPanel = false
	export let showGamesLoadMoreButton = true
	export let gamePerRow = 6

	// Clean Up Games Array
	const games = CleanGamesForBlock(gamesArray)

	// Updating games store with games array data
	GamesStore.set(games)
</script>

<div>
	<div class="relative xl:container px-2 pb-5">
		<!-- {#if block.showGameFilterPanel || showGamesFilterPanel}
			<FilterPanel />
		{/if} -->
		<GameList games={$GamesStore[0]} {gamePerRow} />
		{#if block.showGameMoreButton}
			<div class="flex justify-center mt-6 mb-[44px] md:mt-8">
				<LoadMoreBtn />
			</div>
		{/if}
	</div>
</div>
