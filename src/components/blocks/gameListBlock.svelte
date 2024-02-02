<script lang="ts">
    // First and Third Party Components
    import qs from 'qs'

    import { filterProviders } from '../../../qs/layout.ts';

    // Stores
    import { sortOptions } from '../../../stores/sortFilters.ts';
    import { gameVariables, games, gamesQsStore } from '../../../stores/games.ts';
    import { getTranslations } from '../../../stores/addTranslations.ts';

    // Components
    import GameCard from "../games/gameCard.svelte"
    import DesktopGameFilter from '../filters/desktopGameFilter.svelte';
    import MobileGameFilter from '../filters/mobileGameFilter.svelte';

    // Helpers
    import { gamesQs } from '../../../qs/games.ts';
    import MediaQuery from "../helpers/mediaQuery.svelte"
    
    // Types
    import type { Game } from "../../../interfaces/games.ts"

    export let data

    $: console.log('sortbyt', data)

    // Get provider slugs
    const providerSlugs = data.gameProviders.map(game => game.slotProvider.data.attributes.slug)

    // Get Category Slugs
    const categorySlugs = data.gameCategories.map(game => game.slotCategories.data.attributes.slug)
    
    // Set Game Variables for API Call
    gameVariables.setKey('limit', data.numberOfGames)
    gameVariables.setKey('sort', $sortOptions[data.sortBy] || 'ratingAvg:desc')
    gameVariables.setKey('providers', providerSlugs)
    gameVariables.setKey('categories', data.gameCategories)

    // Create QS String from the updated variables
    const query = qs.stringify(gamesQs($gameVariables.limit, $gameVariables.sort, undefined, $gameVariables.providers, $gameVariables.categories), {encodeValuesOnly: true})
    gamesQsStore.set(`?${query}`)

    $: console.log('vari', qs.stringify(filterProviders(), {encodeValuesOnly: true}))

    const loadMoreGames = () => {
        gameVariables.setKey('limit', $gameVariables.limit + data.numberOfGames)

        // Create QS String from the updated variables
        const query = qs.stringify(gamesQs($gameVariables.limit, $gameVariables.sort, $gameVariables.page, $gameVariables.providers, $gameVariables.categories), {encodeValuesOnly: true})
        gamesQsStore.set(`?${query}`)
    }

    $: console.log('data', data)

</script>

<div>
	<div class="flex flex-col align-center relative xl:container px-2 pb-5">
        <MediaQuery query="(max-width: 768px)" let:matches>
            {#if matches}
                <MobileGameFilter showGameFilterPanel={data.showGameFilterPanel} />
            {:else}
                <DesktopGameFilter showGameFilterPanel={data.showGameFilterPanel} />
            {/if}
        </MediaQuery>
        <div class="[&>*]:px-[6px] -mx-[6px] flex flex-wrap justify-center gap-y-3">
            {#if $games.data?.data}
                {#each $games.data?.data as game}
                    <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                        <GameCard game={game} />
                    </div>
                {/each}
            {/if}
        </div>
        <!-- Load More Button -->
        {#if data.showGameMoreButton}
            <button class="btn self-center mt-5 btn-secondary min-w-[300px] md:min-w-[500px]" on:click={loadMoreGames}>
                {$getTranslations.loadMore}
            </button>
        {/if}
	</div>
</div>