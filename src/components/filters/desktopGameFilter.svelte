<script lang="ts">
    // First and Third Party Plugins
    import qs from 'qs'

    // Stores
    import { getTranslations } from "../../../stores/addTranslations";
    import { gameVariables, providersFilters, gamesQsStore, categoriesFilters } from "../../../stores/games";
    import { sortGames } from '../../../stores/filters';

    // Qeury Strings
    import { gamesQs } from '../../../qs/games';

    // Helpers
    import { urlTranslate } from "../../../utils/data-store.util";
    import Image from "../helpers/images.svelte";
    import Link from '../helpers/link.svelte';

    // Images
    import Xmark from "~icons/kensho-icons/xmark"
    import Angle from "~icons/kensho-icons/angle"
	import SortDesc from "~icons/kensho-icons/sort-desc"
	import SortAsc from "~icons/kensho-icons/sort-asc"

    // Types
    import type { Toggles, GameFilters, BonusLabels } from '../../../interfaces/common/types';

    export let showGameFilterPanel: boolean

    // Variables
    let searchInput: HTMLElement
    let searchInputValue: string = ''
	let searchClient: any
    let searchResults: HTMLElement
    $: toggleOrder = $gameVariables.sort ? $gameVariables.sort?.split(":")[1] : 'desc'

    // Valid Keys for the Casino Filters Array to validate and squash typescript errors
    const validKeys: (keyof GameFilters)[] = ["limit", "sort", "page", "providers", "categories"];

    // Toggles Click Handler
	let toggles = {
        categories: false,
		sort: false
	}

    // Get Sort Store Kets for Looping
    const sortKeys = $sortGames ? Object.keys($sortGames) : [];

    // Function to update games when a provider is clicked
    const handleClick = (provider) => {
        // Set Store Provider Variable Key
        gameVariables.setKey('providers', [provider])

        // Create QS String from the updated variables
        const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})

        // Update the gamesWsStore which will inturn update the games.
        gamesQsStore.set(`?${query}`)
    }

	// Function to get sort label based on the value
	const getSortLabelByValue = (value:string) => {
		const [sortPrefix] = value.split(":");
		const sortLabel = Object.entries($sortGames).find(([_, { value }]) => value.split(":")[0] === sortPrefix);
		return sortLabel ? sortLabel[1].label : null;
	}

    // Function for Changing Sort Direction
    const changeSortOrder = (value: string) => {
		let [key,] = $gameVariables.sort ? $gameVariables.sort?.split(":") : ''

		
		if (key.length > 0) {
            const newSortValue = key + ":" + value
            
			gameVariables.setKey('sort', newSortValue)
        
			// Set QS Query String to Get Updated games
			const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})
			
			// Set Qs Store to Query Value
			gamesQsStore.set(`?${query}`)
		}
	}

    // Handle Toggle States
    const handleToggle = (key: string) => {
		
		// Set all toggles to false initially except the one clicked
		Object.keys(toggles).forEach(toggle => {
			if (toggle !== key) {
				toggles[toggle as keyof Toggles] = false;
			}
		});

		// Then set the specified key to true, if it exists
		if (toggles.hasOwnProperty(key)) {
			toggles[key as keyof Toggles] = !toggles[key as keyof Toggles];
		}

	}

    // Load MielieSearch when the search input is clicked
    const loadSearch = async () => {
		const { useMeilisearch } = await import('../../../lib/useMeiliSearch')

		const { search } = useMeilisearch('no results')
        searchClient = search
	}

    const handleFilterChange = (key: string, value: string | number | string[]) => {

		// Validate the key in indeed in the list of casino filters key then use type assertion to squash the typescript error
		validKeys.includes(key as keyof GameFilters) && gameVariables.setKey(key as keyof GameFilters, value)
        
		// Set QS Query String to Get Updated Casinos
        const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})
		
		// Set Qs Store to Query Value
        gamesQsStore.set(`?${query}`)

        // Set all toggles to false
        Object.keys(toggles).forEach(toggleKey => {
            toggles[toggleKey as keyof Toggles] = false;
        });
    }

    // Click Handler for clearing the filter fields
    const clearFilterOptions = (e: Event, key: string, value: string | number) => {
        e.stopPropagation()

		// Validate the key in indeed in the list of casino filters key then use type assertion to squash the typescript error
		validKeys.includes(key as keyof GameFilters) && gameVariables.setKey(key as keyof GameFilters, value)

        // Set QS Query String to Get Updated Casinos
        const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})

		// Set Qs Store to Query Value
        gamesQsStore.set(`?${query}`)
    }

    // Clear Search Input
    const clearSearch = () => {
        searchInputValue = ''
    }

    $: if (searchClient) {
		searchClient.helper.setQuery(searchInputValue)
		searchClient.helper.search()
	}
    
</script>

{#if showGameFilterPanel}
    <!-- Provider Filters Section -->
    <div class="mb-4">
        <div class="flex justify-between bg-filter-provider-header-bkg rounded-t-md p-2.5">
            <h4 class="text-sm font-bold text-filter-provider-header-text capitalize !m-0">
                {$getTranslations.mostLovedProviders}
            </h4>
            <Link href="/"
                ><span class="text-sm font-bold text-filter-provider-header-text uppercase"
                    >{$getTranslations.seeAllProviders}</span
                ></Link
            >
        </div>
        <div
            class="glowy-bkg shadow-none rounded-t-none flex overflow-x-auto gap-3 p-2.5"
        >
            {#if !$providersFilters.loading}
                {#each $providersFilters.data.data.attributes.filterProviders.data as icon}
                    <button
                        class="max-w-[83px] min-w-[80px] rounded-md {$gameVariables?.providers.length === 1 && $gameVariables?.providers.indexOf(
                            icon?.attributes?.slug
                        ) > -1
                            ? 'border-[2px] border-accent-500'
                            : ''}"
                        on:click={() => handleClick(icon?.attributes?.slug)}
                    >
                        <Image
                            imageUrl={icon?.attributes?.images?.data?.attributes?.url}
                            imageWidth={83}
                            imageHeight={40}
                            imageClass="rounded-md drop-shadow-md"
                            imageAlt={icon?.attributes?.slug}
                        />
                    </button>
                {/each}
            {:else}
                {#each {length: 14} as _}
                    <div class="max-w-[83px] min-w-[80px] min-h-[38px] border-[2px] rounded-md bg-misc/30" />
                {/each}
            {/if}
        </div>
    </div>
    <!-- End of Provider Filters Section -->

    <!-- Game Filters Section -->
    <div class="w-full mx-auto text-center z-20 mb-5">
		<section
			aria-labelledby="filter-heading"
			class="!py-2.5 glowy-bkg shadow-none"
		>
			<div class="flex flex-nowrap items-center gap-2 justify-between">
                <!-- Search Section -->
				<div
					class="bg-transparent p-0 basis-full basis-3/5 relative"
				>
					<div id="searchBox" class="relative peer/search">
						<input
							type="text"
							id="searchInput"
							class="text-xs w-full h-11 uppercase rounded-[4px] peer/input border border-background-900 bg-white/[.7] focus:rounded-b-none"
							placeholder="{$getTranslations.search}"
                            bind:this={searchInput}
                            bind:value={searchInputValue}
                            on:focus|once={loadSearch}
                            on:focus={() => handleToggle('search')}
						/>
						<button
							class="absolute hidden right-1 top-1/2 -translate-y-1/2 {searchInputValue.length > 0 ? '!block' : ''}"
                            on:click={clearSearch}
						>
                            <Xmark class="h-6 w-6" />
						</button>
					</div>
					<div
                        bind:this={searchResults}
						class="absolute transform opacity-0 scale-95 left-0 z-40 w-full origin-top-left rounded-b-md bg-white border-background-900 border border-t-0 p-2 shadow-2xl peer-focus-within/search:transform peer-focus-within/search:opacity-100 peer-focus-within/search:scale-100 peer-focus-within/search:visible"
					>
                        <div class="row d-flex align-items-start justify-content-center">
                            <div class="col-md-9 col-sm-12 col-12 col-xl-9 col-xxl-9">
                            <div class="search-results xl:container" id="results"></div>
                            </div>
                        </div>
                    </div>
				</div>
                <!-- Search Section -->

                <!-- Categories Section -->
				<div
					class="flex basis-full items-center gap-2 justify-between bg-transparent p-0 basis-2/5"
				>

					<div class="relative basis-1/2 flex items-baseline">
                        <div class="w-full inline-flex rounded-md shadow-sm">
                            <div
                                class="group relative p-2.5 rounded-[4px] border-background-900 bg-white/[.7] border w-full h-11 flex justify-between items-center open:rounded-b-none {$gameVariables.categories.length > 0 ? '!bg-filter-alternate-toggle' : ''}"
                                aria-expanded="false"
                                role="button"
                                tabindex="-1"
                                {...(toggles.categories ? { open:'' } : {})}
                                on:click={() => handleToggle('categories')}
                            >
                                <span class="uppercase text-xs pointer-events-none">
                                    {$gameVariables.categories.length > 0 ? $gameVariables.categories[0] : $getTranslations.categories}
                                </span>
                                {#if $gameVariables.categories.length > 0}
                                    <button type="button" on:click={(e) => clearFilterOptions(e, 'categories', [])}>
                                        <Xmark class="h-6 w-6" />
                                    </button>
                                {:else}
                                    <Angle class="rotate-180 group-open:rotate-0"/>
                                {/if}
                            </div>
                        </div>
                        <div
                            class="absolute invisible max-h-[350px] top-11 overflow-y-auto transform opacity-0 scale-95 left-0 z-40 w-full origin-top-left rounded-b-md bg-white/[.9] border-background-900 border border-t-0 py-2 shadow-2xl open:transform open:opacity-100 open:scale-100 open:visible"
                            {...(toggles.categories ? { open:'' } : {})}
                        >
                            <div class="flex flex-col gap-y-2 py-1 px-2" role="none">
                                {#if $categoriesFilters.data}
                                    {#each $categoriesFilters.data.data as cat}
                                        <button
                                            class="p-2 text-sm uppercase font-medium text-left rounded-md hover:bg-blue-500 hover:text-white data-active:bg-blue-500 data-active:text-white"
                                            role="menuitem"
                                            tabindex="-1"
                                            id="mobile-menu-item-0"
                                            on:click={() => handleFilterChange('categories', [cat.attributes.slug])}
                                        >
                                            {cat.attributes.title}
                                        </button>
                                    {/each}
                                {/if}
                            </div>
                        </div>
					</div>

					<div class="basis-1/2 relative inline-block text-left ">
						<span class="isolate w-full inline-flex rounded-md shadow-sm">
							<button
								type="button"
								class="relative peer w-full h-11 rounded-l-[4px]  bg-white/[.7] border-background-900 border flex items-center gap-x-1.5 rounded-l-md p-2.5 uppercase text-xs open:rounded-b-none"
                                {...(toggles.sort ? { open:'' } : {})}
                                on:click={() => handleToggle('sort')}
							>
								{$gameVariables.sort ? getSortLabelByValue($gameVariables.sort) : $getTranslations.sortFilterH6}
							</button>
							<button
								type="button"
								class="relative h-11 -ml-px w-full rounded-r-[4px] border-background-900 border basis-1/5 flex items-center rounded-r-md bg-filter-alternate-toggle p-2.5 peer-open:rounded-b-none"
                                on:click={() => changeSortOrder(toggleOrder === 'desc' ? 'asc' : 'desc')}
							>
								{#if toggleOrder === 'desc'}
		    						<SortDesc width="20px" height="18px" class="fill-filter-alternate-icon" /> 
                                {:else}
                                    <SortAsc width="20px" height="18px" class="fill-filter-alternate-icon" />
                                {/if}
							</button>
						</span>

						<div
							class="absolute invisible h-max overflow-y-auto transform opacity-0 scale-95 w-full right-0 origin-top-right rounded-b-md bg-white/[.9] shadow-2xl border-background-900 border border-t-0 open:transform open:opacity-100 open:scale-100 open:visible"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="mobile-menu-button"
							tabindex="-1"
                            {...(toggles.sort ? { open:'' } : {})}
						>
							<div class="flex flex-col gap-y-2 py-1 px-2" role="none">
                                {#each sortKeys as key}
									<button
										class="p-2 text-sm uppercase font-medium text-left rounded-md hover:bg-blue-500 hover:text-white data-active:bg-blue-500 data-active:text-white"
										role="menuitem"
										tabindex="-1"
										id="sort-keys"
										{...($gameVariables.sort === $sortGames[key].value) ? {'data-ui':'active'} : {}}
										on:click={() => handleFilterChange('sort', $sortGames[key]?.value)}
									>
										{($sortGames[key]?.label)}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
    <!-- End of Games Filters Section -->
{/if}