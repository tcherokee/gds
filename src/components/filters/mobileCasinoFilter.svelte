<script lang="ts">
    // Import First or Third Party Plugins
	import qs from 'qs'
    import { get } from 'svelte/store';

    // Import Types
    import type { CasinoFilters, BonusLabels } from '../../../interfaces/common/types';

    // Import QS Function
    import { casinosQs } from "../../../qs/casinos"

    // Import Images
    import Xmark from "~icons/kensho-icons/xmark"
	import SortDesc from "~icons/kensho-icons/sort-desc"
	import SortAsc from "~icons/kensho-icons/sort-asc"
	import Sliders from "~icons/kensho-icons/sliders"

    // Import Stores
    import { getTranslations } from '../../../stores/addTranslations';
    import { bonusLabels, conditions, sort } from "../../../stores/filters"
    import { casinoQsStore, casinoVariables, wageringReqAmount, bonusAmount, alphabeticProviders} from "../../../stores/casinos"

    //get translation context
    const translationStore:any = get(getTranslations);

	// Valid Keys for the Casino Filters Array to validate and squash typescript errors
    const validKeys: (keyof CasinoFilters)[] = ["limit", "sort", "providers", "ids", "bonusKey", "condition", "amount", "wagering", "speed"];

	// Function to get bonus label based on the value
	const  getLabelByValue = (data: BonusLabels, searchValue: string): string | undefined => {
		for (let key in data) {
			if (data[key]?.value === searchValue) {
				return data[key]?.label;
			}
		}
		return undefined; // Return undefined if no matching value is found
	}

    // Get Bonus Type Store Keys for Looping
    const bonusTypeKeys = $bonusLabels ? Object.keys($bonusLabels) : [];

	// Get Condition Store Keys for Looping
	const conditionsKeys = $conditions ? Object.keys($conditions) : [];

	// Get Sort Store Kets for Looping
	const sortKeys = $sort ? Object.keys($sort) : [];

    // Variables
	let toggleSort: false
	let mobileFilterBtn: boolean = false
    let mobileVariables = $casinoVariables
    
    $: selection = Object.keys(mobileVariables).reduce((acc, key) => {
        if (key !== 'limit' && key !== 'sort') {
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

	$: toggleOrder = $casinoVariables.sort ? $casinoVariables.sort?.split(":")[1] : 'desc'

	const handleMobileFilterSubmit = () => {

		// Set QS Query String to Get Updated Casinos
        const query = qs.stringify(casinosQs($casinoVariables), {encodeValuesOnly: true})
		
		// Set Qs Store to Query Value
        casinoQsStore.set(`?${query}`)

	}

	const getSortLabelByValue = (value:string) => {
		const [sortPrefix] = value.split(":");
		const sortLabel = Object.entries($sort).find(([_, { value }]) => value.split(":")[0] === sortPrefix);
		return sortLabel ? sortLabel[1].label : null;
	}

	const changeSortOrder = (value: string) => {
		let [key,] = $casinoVariables.sort ? $casinoVariables.sort?.split(":") : ''

		
		if (key.length > 0) {
			const newSortValue = key + ":" + value

			casinoVariables.setKey('sort', newSortValue)
        
			// Set QS Query String to Get Updated Casinos
			const query = qs.stringify(casinosQs($casinoVariables), {encodeValuesOnly: true})
			
			// Set Qs Store to Query Value
			casinoQsStore.set(`?${query}`)
		}
	}


    const handleFilterChange = (key: string, value: string | number) => {

		// Validate the key in indeed in the list of casino filters key then use type assertion to squash the typescript error
		validKeys.includes(key as keyof CasinoFilters) && casinoVariables.setKey(key as keyof CasinoFilters, value)
        
		// Set QS Query String to Get Updated Casinos
        const query = qs.stringify(casinosQs($casinoVariables), {encodeValuesOnly: true})
		
		// Set Qs Store to Query Value
        casinoQsStore.set(`?${query}`)
    }

    // Click Handler for clearing the filter fields
    const clearFilterOptions = () => {

		// Set Casino IDs to an empty array or it will override any filtering
		mobileVariables = {
            limit: 1000,
            sort: "ratingAvg:desc",
            providers: [],
            ids: [],
            bonusKey: "",
            condition: "",
            amount: "",
            wagering: "",
            speed: ""
        }
    }

</script>

<div class="text-black relative mb-10 z-20">
    <section class="glowy-bkg shadow-none flex gap-2 p-2.5">
        <div class="relative z-40 flex basis-1/2 cursor-pointer items-center shadow-sm overflow-hidden">
            <input type="checkbox" id="toggleMobileFilters" bind:checked={mobileFilterBtn} class="hidden"/>
            <label for="toggleMobileFilters" class="bg-filter-alternate-toggle h-11 rounded-md border border-background-900 uppercase relative items-center justify-between flex w-full text-sm p-2.5">
                <span>
                    {translationStore.filter}
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
                        class="relative peer w-full h-11 rounded-l-[4px] bg-filter-alternate-toggle border-background-900 border flex items-center gap-x-1.5 rounded-l-md p-2.5 uppercase text-xs open:rounded-b-none text-xs"
                        {...(toggleSort ? { open:'' } : {})}
                    >
                        {$casinoVariables.sort ? getSortLabelByValue($casinoVariables.sort) : translationStore.welcomeBonus }
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
                                {...($casinoVariables.sort === $sort[key].value) ? {'data-ui':'active'} : {}}
                                on:click={() => handleFilterChange('sort', $sort[key]?.value)}
                            >
                                {($sort[key]?.label)}
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
                    <h2 class="text-lg uppercase font-medium !text-black">{translationStore.filter}</h2>
                    <button
                        type="button"
                        class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        on:click={() => (mobileFilterBtn = false)}
                    >
                        <span class="sr-only">{translationStore.closeMenu}</span>
                        <Xmark />
                    </button>
                </div>

                <form class="mt-2 relative" on:submit|preventDefault={handleMobileFilterSubmit}>
                    <!-- Bonus Type Section  -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3">
                            <span class="font-medium text-gray-900">{translationStore.bonusType}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                            {#each bonusTypeKeys as key}
                                <div class="flex">
                                    <input
                                        type="radio"
                                        id={$bonusLabels[key]?.value}
                                        value={$bonusLabels[key]?.value}
                                        bind:group={mobileVariables.bonusKey}
                                        name="bonus-type"
                                        class="peer hidden"
                                        on:change={() => handleFilterChange('bonusKey', $bonusLabels[key]?.value)}
                                    />
                                    <label
                                        for={$bonusLabels[key]?.value}
                                        class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                    >
                                        {$bonusLabels[key]?.label}
                                    </label>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <!-- End of Bonus Type Section -->

                    <!-- Conditions Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore.condition}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                            {#each conditionsKeys as key}
                                <div class="flex">
                                    <input
                                        type="radio"
                                        name="conditionSelection"
                                        id={$conditions[key]?.value}
                                        value={$conditions[key]?.value}
                                        bind:group={mobileVariables.condition}
                                        class="peer hidden"
                                        on:change={() => handleFilterChange('condition', $conditions[key]?.value)}
                                    />
                                    <label
                                        for={$conditions[key]?.value}
                                        class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                    >
                                        {$conditions[key]?.label}
                                    </label>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <!-- End Conditions Section -->

                    <!-- Bonus Amount Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore.bonusAmount}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                                {#each $bonusAmount as bonus}
                                    <div class="flex">
                                        <input
                                            type="radio"
                                            name="amountSelection"
                                            id={`bonus-${bonus}`}
                                            value={bonus}
                                            bind:group={mobileVariables.amount}
                                            class="peer hidden"
                                            on:change={() => handleFilterChange('amount', bonus)}
                                        />
                                        <label
                                            for={`bonus-${bonus}`}
                                            class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                        >
                                            {bonus}
                                        </label>
                                    </div>
                                {/each}
                        </div>
                    </div>
                    <!-- End of Bonus Amount Section -->

                    <!-- Wagering Amount Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore.wagering}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                                {#each $wageringReqAmount as wager}
                                    <div class="flex">
                                        <input
                                            type="radio"
                                            name="wageringSelection"
                                            id={`wager-${wager}`}
                                            value={wager}
                                            bind:group={mobileVariables.wagering}
                                            class="peer hidden"
                                            on:change={() => handleFilterChange('wagering', wager)}
                                        />
                                        <label
                                            for={`wager-${wager}`}
                                            class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                        >
                                            {wager}
                                        </label>
                                    </div>
                                {/each}
                        </div>
                    </div>
                    <!-- End of Wagering Amount Section -->

                    <!-- Bonus Speed Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore.immediate}</span>
                        </h3>
                        <div class="flex flex-wrap px-6 gap-2">
                            <div class="flex">
                                <input
                                    type="radio"
                                    name="speedSelection"
                                    id="immediate"
                                    value="immediate"
                                    bind:group={mobileVariables.speed}
                                    class="peer hidden"
                                    on:change={() => handleFilterChange('speed', "immediate")}
                                />
                                <label
                                    for="immediate"
                                    class="select-none relative text-[10px] uppercase cursor-pointer rounded-full border border-transparent bg-white gradient-box py-1 px-2.5 font-bold transition-colors duration-200 ease-in-out peer-checked:catpill"
                                >
                                    {translationStore.immediate}
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- End of Bonus Speed Section -->

                    <!-- Providers Section -->
                    <div class="pb-6">
                        <h3 class="flex flex-col px-4 py-3 border-t border-grey-300">
                            <span class="font-medium text-gray-900">{translationStore.software}</span>
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
                                                        on:click={() => handleFilterChange('providers', item.value)}
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
                                ? `${translationStore.clear}(` + selection + ')'
                                : translationStore.clear}
                        </button>
                        <button type="submit" class="btn btn-secondary" on:click={(e) => e.preventDefault()} on:click={() => mobileFilterBtn = false}>{translationStore.submit}</button>
                    </div>
                    <!-- End of Sticky Buttons at the Bottom -->
                </form>
            </div>
        </div>
    </div>
</div>