<script lang="ts">
    // Import First or Third Party Plugins
	import qs from 'qs';
// Types
    import type { GameFilters, TranslationData } from '../../../interfaces/common/types';
    // Import QS Function
    import { gamesQs } from '../../../qs/games';

    // Import Images
    import Sliders from "~icons/kensho-icons/sliders";
    import SortAsc from "~icons/kensho-icons/sort-asc";
    import SortDesc from "~icons/kensho-icons/sort-desc";
    import Xmark from "~icons/kensho-icons/xmark";

    import { alphabeticProviders } from "../../../stores/casinos";
    import { sortGames } from "../../../stores/filters";
    import { categoriesFilters, gameVariables, gamesQsStore } from "../../../stores/games";
  import type { TUserGameProvider } from '../../../interfaces/games';

    export let page = 1;
    export let translationStore: TranslationData = {}
    export let slotCategories: TUserGameProvider[] = [];

    //get translation context
    // const translationStore:TranslationData = get(getTranslations);

	// Valid Keys for the Casino Filters Array to validate and squash typescript errors
    const validKeys: (keyof GameFilters)[] = ["limit", "sort", "page", "providers", "categories"];

	// Get Sort Store Kets for Looping
	const sortKeys = $sortGames ? Object.keys($sortGames) : [];

    // Variables
    let searchInput: HTMLElement
    let searchInputValue: string = ''
	let searchClient: any
    let searchResults: HTMLElement
	let toggleSort: false
	let mobileFilterBtn: boolean = false
    let mobileVariables = $gameVariables
    
    $: selection = Object.keys(mobileVariables).reduce((acc, key) => {
        if (key === 'categories' || key === 'providers') {
            // Check if the value is an array
            if (Array.isArray(mobileVariables[key])) {
                // Count each item in the array
                acc += mobileVariables[key].length;
            } else if (mobileVariables[key] !== "") {
                // Count non-empty values
                acc += 1;
            }
        }
        return acc;
    }, 0)

	$: toggleOrder = $gameVariables.sort ? $gameVariables.sort?.split(":")[1] : 'desc'

	const handleMobileFilterSubmit = () => {

        gameVariables.setKey('page', 1);
        gameVariables.setKey('categories', mobileVariables.categories || [])
        gameVariables.setKey('providers', mobileVariables.providers || [])

		// Set QS Query String to Get Updated Casinos
        const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})
		
		// Set Qs Store to Query Value
        gamesQsStore.set(`?${query}`)

        mobileFilterBtn = false
	}

	const getSortLabelByValue = (value:string) => {
		const [sortPrefix] = value.split(":");
		const sortLabel = Object.entries($sortGames).find(([_, { value }]) => value.split(":")[0] === sortPrefix);
		return sortLabel ? sortLabel[1].label : null;
	}

	const changeSortOrder = (value: string) => {
		let [key,] = $gameVariables.sort ? $gameVariables.sort?.split(":") : ''

		
		if (key.length > 0) {
			const newSortValue = key + ":" + value

			gameVariables.setKey('sort', newSortValue)
            gameVariables.setKey('page', page);
        
			// Set QS Query String to Get Updated Casinos
			const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})
			
			// Set Qs Store to Query Value
			gamesQsStore.set(`?${query}`)
		}
	}

    // Load MielieSearch when the search input is clicked
    const loadSearch = async () => {
		const { useMeilisearch } = await import('../../../lib/useMeiliSearch')

		const { search } = useMeilisearch('no results')
        searchClient = search
	}

    // Clear Search Input
    const clearSearch = () => {
        searchInputValue = ''
    }

    const handleFilterChange = (key: string, value: string | number) => {

		// Validate the key in indeed in the list of casino filters key then use type assertion to squash the typescript error
		validKeys.includes(key as keyof GameFilters) && gameVariables.setKey(key as keyof GameFilters, value)
        gameVariables.setKey('page', 1);

		// Set QS Query String to Get Updated Casinos
        const query = qs.stringify(gamesQs($gameVariables), {encodeValuesOnly: true})
		
		// Set Qs Store to Query Value
        gamesQsStore.set(`?${query}`)

        // Set all toggles to false
        toggleSort = false
    }

    // Click Handler for clearing the filter fields
    const clearFilterOptions = () => {

		// Set Casino IDs to an empty array or it will override any filtering
		mobileVariables = {
            limit: 1000,
            sort: "ratingAvg:desc",
            page: page,
            providers: [],
            categories: []
        }
    }

    $: if (searchClient) {
		searchClient.helper.setQuery(searchInputValue)
		searchClient.helper.search()
	}

</script>

<div class="text-black relative mb-10 z-50 flex flex-col md:hidden">
    <!-- Search Section -->
    <!-- <div
        class="glowy-bkg shadow-none flex gap-2 p-2.5 mb-3 relative z-50"
    >
        <div id="searchBox" class="relative w-full peer/search">
            <input
                type="text"
                id="searchInput"
                class="text-base w-full h-11 uppercase rounded-[4px] peer/input border border-background-900 bg-white/[.7] focus:rounded-b-none"
                placeholder="{translationStore?.search}"
                bind:this={searchInput}
                bind:value={searchInputValue}
                on:focus|once={loadSearch}
                on:focus={() => toggleSort = false}
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
            class="absolute transform opacity-0 scale-95 right-2.5 left-2.5 z-50 top-[53px] origin-top-left rounded-b-md bg-white border-background-900 border border-t-0 p-2 shadow-2xl peer-focus-within/search:transform peer-focus-within/search:opacity-100 peer-focus-within/search:scale-100 peer-focus-within/search:visible"
        >
            <div class="row d-flex align-items-start justify-content-center">
                <div class="col-md-9 col-sm-12 col-12 col-xl-9 col-xxl-9">
                <div class="search-results xl:container" id="results"></div>
                </div>
            </div>
        </div>
    </div> -->
    <!-- Search Section -->

    <section class="glowy-bkg shadow-none flex gap-2 p-2.5">
        <div class="relative z-40 flex basis-1/2 cursor-pointer items-center shadow-sm overflow-hidden">
            <input type="checkbox" id="toggleMobileFilters" bind:checked={mobileFilterBtn} on:click={() => toggleSort = false} class="hidden"/>
            <label for="toggleMobileFilters" class="bg-filter-alternate-toggle h-11 rounded-md border border-background-900 uppercase relative items-center justify-between flex w-full text-sm p-2.5">
                <span>
                    {translationStore?.filter}
                    {selection > 0
                        ? '(' + selection + ')'
                        : ''}
                </span>
                <Sliders />
            </label>
        </div>

        <!-- Toggle Mobile Filter -->
        <div class="relative basis-1/2">
            <div id="desktop-menu-0" class="relativ w-full inline-block text-left">
                <div class="w-full inline-flex rounded-md shadow-sm">
                    <input
                        id="mobileSort"
                        type="checkbox"
                        class="hidden"
                        aria-expanded="false"
                        role="button"
                        tabindex="-1"
                        bind:checked={toggleSort}
                    />
                    <label 
                        for="mobileSort"
                        class="relative peer w-full h-11 rounded-l-[4px] bg-filter-alternate-toggle border-background-900 border flex items-center gap-x-1.5 rounded-l-md p-2.5 uppercase text-sm open:rounded-b-none"
                        {...(toggleSort ? { open:'' } : {})}
                    >
                        {$gameVariables.sort ? getSortLabelByValue($gameVariables.sort) : translations.sortFilterH6 }
                    </label>
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
                </div>

                <div
                    class="bg-white p-3 absolute invisible max-h-[350px] overflow-y-auto transform opacity-0 scale-95 left-0 z-40 w-full origin-top-left rounded-b-md border-background-900 border border-t-0 shadow-2xl open:transform open:opacity-100 open:scale-100 open:visible"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="mobile-menu-button"
                    tabindex="-1"
                    {...(toggleSort ? { open:'' } : {})}
                >
                    <div class="flex flex-col gap-y-2 py-1" role="none">
                        {#each sortKeys as key}
                            <button
                                class="uppercase p-2 m-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-white/[.7] data-active:blueFilterBtn data-active:border-misc/[.6]"
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
        <!-- End of Toggle Mobile Filter -->
    </section>

    <div
        class="relative delay-300 invisible md:hidden open:visible open:delay-0"
        role="dialog"
        aria-modal="true"
        {...(mobileFilterBtn ? { open:'' } : {})}
    >

        <div
            class="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ease-linear duration-300 opacity-0 open:opacity-100"
            {...(mobileFilterBtn ? { open:'' } : {})}
        />

        <div class="fixed inset-0 z-50 flex">
            <div
                class="relative flex w-full h-5/6 mt-auto flex-col overflow-y-auto bg-white pt-0 pb-2 shadow-xl transition ease-in-out duration-300 transform translate-y-full open:translate-y-0"
                {...(mobileFilterBtn ? { open:'' } : {})}
            >
                <div
                    class="border-b border-grey-300 sticky top-0 bg-white z-[999] flex items-center justify-between p-4"
                >
                    <h2 class="text-lg uppercase font-medium !text-black">{translationStore?.filter}</h2>
                    <button
                        type="button"
                        class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        on:click={() => (mobileFilterBtn = false)}
                    >
                        <span class="sr-only">{translationStore?.closeMenu}</span>
                        <Xmark />
                    </button>
                </div>

                <form class="mt-2 relative" on:submit|preventDefault={handleMobileFilterSubmit}>
                    <!-- Bonus Type Section  -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3">
                            <span class="font-medium text-gray-900">{translationStore?.categories}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                            {#each slotCategories as cat}
                                <div class="flex">
                                    <input
                                        type="checkbox"
                                        id={cat.slug}
                                        bind:group={mobileVariables.categories}
                                        value={cat.slug}
                                        class="peer hidden"
                                    />
                                    <label
                                        for={cat.slug}
                                        class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                        >{cat.title}</label
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Providers Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore?.software}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                            <div class="space-y-6 w-full">
                                {#if $alphabeticProviders}
                                    {#each $alphabeticProviders as provider}
                                        <h4
                                            class="flex gap-2 items-center after:bg-grey-300 after:h-px after:content[''] after:w-full"
                                        >
                                            {provider[0]}
                                        </h4>
                                        <div class="grid grid-cols-2 gap-x-2 gap-y-4">
                                            {#each provider[1] as item}
                                                <div class="flex shrink basis-1/2">
                                                    <input
                                                        type="checkbox"
                                                        id={item.value}
                                                        value={item.value}
                                                        bind:group={mobileVariables.providers}
                                                        class="peer hidden"
                                                    />
                                                    <label
                                                        for={item.value}
                                                        class="flex w-full gap-4 text-sm text-blue-900 capitalize p-1 rounded-sm peer-checked:bg-blue-700 peer-checked:text-white"
                                                    >
                                                        <span>{item.label}</span>
                                                    </label>
                                                </div>
                                            {/each}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    </div>
                    <!-- End of Provider Section -->

                    <!-- Sticky Buttons at the Bottom -->
                    <div
                        class="sticky items-center border-t px-2 border-grey-300 inset-x-0 bottom-0 h-16 grid grid-flow-row-dense grid-cols-2 gap-3 bg-grey-100"
                    >
                        <button type="button" class="btn btn-misc" on:click={clearFilterOptions}>
                            {selection > 0
                                ? `${translationStore?.clear}(` + selection + ')'
                                : translationStore.clear}
                        </button>
                        <button type="submit" class="btn btn-secondary">{translationStore?.submit}</button>
                    </div>
                    <!-- End of Sticky Buttons at the Bottom -->
                </form>
            </div>
        </div>
    </div>
</div>