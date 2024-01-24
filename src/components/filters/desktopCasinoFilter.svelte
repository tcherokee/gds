<script lang="ts">
    // Import First or Third Party Plugins
	import qs from 'qs'
    import { get } from 'svelte/store';

    // Import Types
    import type { CasinoFilters, BonusLabels } from '../../../interfaces/common/types';

    // Import QS Function
    import { casinosQs } from "../../../qs/casinos"

    // Import Images
    import Angle from "~icons/kensho-icons/angle"
    import Xmark from "~icons/kensho-icons/xmark"
	import SortDesc from "~icons/kensho-icons/sort-desc"
	import SortAsc from "~icons/kensho-icons/sort-asc"

    // Import Stores
    import { getTranslations } from '../../../stores/addTranslations';
    import { bonusLabels, conditions, sort } from "../../../stores/filters"
    import { casinoQsStore, casinoVariables, wageringReqAmount, bonusAmount } from "../../../stores/casinos"

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

    // Bonus Type Section Click Handler
    let toggleBonusType: boolean = false
	let toggleConditions: boolean = false
	let toggleAmount: boolean = false
	let toggleWagering: boolean = false
	let toggleImmediate: boolean = false
	let toggleSort: boolean = false
	$: toggleOrder = $casinoVariables.sort ? $casinoVariables.sort?.split(":")[1] : 'desc'

	const handleToggle = () => {
		// Map the current states to an object
		let toggleStates = {
			toggleBonusType,
			toggleConditions,
			toggleAmount,
			toggleWagering,
			toggleImmediate,
			toggleSort
		};

		// Set all to true
		for (const toggleKey in toggleStates) {
			toggleStates[toggleKey] = true;
		}

		// Set the specified key to false
		if (toggleStates.hasOwnProperty(key)) {
			toggleStates[key] = false;
		}

		// Update the original variables
		({ toggleBonusType, toggleConditions, toggleAmount, toggleWagering, toggleImmediate, toggleSort } = toggleStates);
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
			console.log('here', key, value, newSortValue)

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

		// If key is equal to speed, then toggle toggleImmediate.
		if (key === "speed") {
			toggleImmediate = !toggleImmediate
		}
    }

    // Click Handler for clearing the filter fields
    const clearFilterOptions = (e: Event, key: string, value: string | number) => {
        e.stopPropagation()

		// Set Casino IDs to an empty array or it will override any filtering
		$casinoVariables.ids.length > 0 && casinoVariables.setKey('ids', [])

		// Validate the key in indeed in the list of casino filters key then use type assertion to squash the typescript error
		validKeys.includes(key as keyof CasinoFilters) && casinoVariables.setKey(key as keyof CasinoFilters, value)

        // Set QS Query String to Get Updated Casinos
        const query = qs.stringify(casinosQs($casinoVariables), {encodeValuesOnly: true})

		// Set Qs Store to Query Value
        casinoQsStore.set(`?${query}`)
    }

	$: console.log($casinoVariables)
</script>

<div class="relative mx-auto text-center z-20">
		<section aria-labelledby="filter-heading" class="glowy-bkg shadow-none p-2.5">
			<h2 id="filter-heading" class="sr-only">{translationStore.filter}</h2>

			<div class="flex items-center gap-2 justify-between">
				<div class="hidden basis-1/2 md:basis-5/6 md:flex md:items-baseline md:space-x-4">

                    <!-- Bonus Type Section -->
					<div id="desktop-menu-0" class="inline-block text-left">
						<div class="w-48">
							<div
								class="relative group p-2 rounded-[4px] h-11 flex w-full items-center justify-between text-sm font-medium border-grey-100 border {$casinoVariables.bonusKey ? 'bg-filter-alternate-toggle' : ''}"
								aria-expanded="false"
								role="button"
								tabindex="-1"
                                {...(toggleBonusType ? { open:'' } : {})}
                                on:click={() => handleToggle('toggleBonusType')}
							>
								<span class="uppercase text-xs pointer-events-none">
                                    {$casinoVariables.bonusKey ? getLabelByValue($bonusLabels, $casinoVariables.bonusKey) : translationStore.welcomeBonus }
                                </span>
                                {#if $casinoVariables.bonusKey}
									<button type="button" on:click={(e) => clearFilterOptions(e, 'bonusKey', '')}>
										<Xmark  />
									</button>
                                {:else}
                                    <Angle class="rotate-180 group-open:rotate-0"/>
                                {/if}
							</div>
						</div>
						<div
							class="glowy-bkg bg-[#101c34] shadow-none px-4 absolute invisible h-max w-max overflow-y-auto transform opacity-0 scale-95 left-0 top-[70px] z-40 w-full origin-top-left rounded-md open:transform open:opacity-100 open:scale-100 open:visible"
							{...(toggleBonusType ? { open:'' } : {})}
						>
							<div class="flex gap-2 py-1" role="none">
								<!-- Active: "bg-gray-100", Not Active: "" -->
								{#each bonusTypeKeys as key}
									<button
										class="uppercase p-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-white/[.7] data-active:blueFilterBtn data-active:border-misc/[.6]"
										role="menuitem"
										tabindex="-1"
										id="mobile-menu-item-0"
                                        on:click={() => handleFilterChange('bonusKey', $bonusLabels[key]?.value)}
									>
                                        {$bonusLabels[key]?.label}
                                    </button>
								{/each}
							</div>
						</div>
					</div>
                    <!-- End of Bonus Type Section -->

					<!-- Condition Section -->
					<div id="desktop-menu-0" class="inline-block text-left">
						<div class="w-48">
							<div
								class="relative group p-2 rounded-[4px] h-11 flex w-full items-center justify-between text-sm font-medium border-grey-100 border {$casinoVariables.condition ? 'bg-filter-alternate-toggle' : ''}"
								aria-expanded="false"
								role="button"
								tabindex="-1"
                                {...(toggleConditions ? { open:'' } : {})}
                                on:click={() => toggleConditions = !toggleConditions}
							>
								<span class="uppercase text-xs pointer-events-none">
                                    {$casinoVariables.condition ? getLabelByValue($conditions, $casinoVariables.condition) : translationStore.condition }
                                </span>
                                {#if $casinoVariables.condition}
									<button type="button" on:click={(e) => clearFilterOptions(e, 'condition', '')}>
										<Xmark  />
									</button>
                                {:else}
                                    <Angle class="rotate-180 group-open:rotate-0"/>
                                {/if}
							</div>
						</div>
						<div
							class="glowy-bkg bg-[#101c34] shadow-none px-4 absolute invisible h-max w-max overflow-y-auto transform opacity-0 scale-95 left-0 top-[70px] z-40 w-full origin-top-left rounded-md open:transform open:opacity-100 open:scale-100 open:visible"
							{...(toggleConditions ? { open:'' } : {})}
						>
							<div class="flex gap-2 py-1" role="none">
								{#each conditionsKeys as key}
									<button
										class="uppercase p-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-white/[.7] data-active:blueFilterBtn data-active:border-misc/[.6]"
										role="menuitem"
										tabindex="-1"
										id="mobile-menu-item-0"
                                        on:click={() => handleFilterChange('condition', $conditions[key]?.value)}
									>
                                        {$conditions[key]?.label}
                                    </button>
								{/each}
							</div>
						</div>
					</div>
					<!-- End Of Condition Section -->

					<!-- Amount Dropdown -->
					<div class="hidden relative basis-1/2 sm:flex sm:items-baseline sm:space-x-8">
						<div id="desktop-menu-0" class="relativ w-full inline-block text-left">
							<div>
								<div
									class="relative group p-2 rounded-[4px] h-11 flex w-full items-center justify-between text-sm font-medium border-grey-100 border open:rounded-b-none {$casinoVariables.amount ? 'bg-filter-alternate-toggle' : ''}"
									aria-expanded="false"
									role="button"
									tabindex="-1"
									{...(toggleAmount ? { open:'' } : {})}
									on:click={() => toggleAmount = !toggleAmount}
								>
									<span class="uppercase text-xs pointer-events-none">
										{$casinoVariables.amount ? $casinoVariables.amount : translationStore.bonusAmount }
									</span>
									{#if $casinoVariables.amount}
										<button type="button" on:click={(e) => clearFilterOptions(e, 'amount', '')}>
											<Xmark  />
										</button>
									{:else}
										<Angle class="rotate-180 group-open:rotate-0"/>
									{/if}
								</div>
							</div>

							<div
								class="bg-white absolute invisible p-3 max-h-[350px] overflow-y-auto transform opacity-0 scale-95 left-0 z-40 w-full origin-top-left rounded-b-md border-background-900 border border-t-0 shadow-2xl open:transform open:opacity-100 open:scale-100 open:visible"
								{...(toggleAmount ? { open:'' } : {})}
							>
								<div class="flex flex-col gap-y-2 py-1" role="none">
									{#each $bonusAmount as bonus}
										<button
											class="uppercase p-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-filter-alternate-toggle data-active:blueFilterBtn data-active:border-misc/[.6]"
											role="menuitem"
											tabindex="-1"
											id="mobile-menu-item-0"
											on:click={() => handleFilterChange('amount', bonus)}
										>
											{bonus}
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<!-- End Amount dropdown -->

					<!-- Wagering -->
					<div class="hidden relative basis-1/2 sm:flex sm:items-baseline sm:space-x-8">
						<div id="desktop-menu-0" class="relativ w-full inline-block text-left">
							<div>
								<div
									class="relative group p-2 flex rounded-[4px] h-11 w-full items-center justify-between text-sm font-medium border-grey-100 border open:rounded-b-none {$casinoVariables.wagering ? 'bg-filter-alternate-toggle' : ''}"
									aria-expanded="false"
									role="button"
									tabindex="-1"
									{...(toggleWagering ? { open:'' } : {})}
									on:click={() => toggleWagering = !toggleWagering}
								>
									<span class="uppercase text-xs pointer-events-none">
										{$casinoVariables.wagering ? $casinoVariables.wagering : translationStore.wagering }
									</span>
									{#if $casinoVariables.wagering}
										<button type="button" on:click={(e) => clearFilterOptions(e, 'wagering', '')}>
											<Xmark  />
										</button>
									{:else}
										<Angle class="rotate-180 group-open:rotate-0"/>
									{/if}
								</div>
							</div>

							<div
								class="bg-white p-3 absolute invisible max-h-[350px] overflow-y-auto transform opacity-0 scale-95 left-0 z-40 w-full origin-top-left rounded-b-md border-background-900 border border-t-0 shadow-2xl open:transform open:opacity-100 open:scale-100 open:visible"
								{...(toggleWagering ? { open:'' } : {})}
							>
								<div class="flex flex-col gap-y-2 py-1" role="none">
									{#each $wageringReqAmount as wager}
										<button
											class="uppercase p-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-white/[.7] data-active:blueFilterBtn data-active:border-misc/[.6]"
											role="menuitem"
											tabindex="-1"
											id="mobile-menu-item-0"
											on:click={() => handleFilterChange('wagering', wager)}
										>
											{wager}
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<!-- Wagering end -->

					<!-- Immediate Toggle -->
					<div class="relative flex items-start">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label
								for="immediate"
								class="font-medium capitalize text-grey-300 cursor-not-allowed open:text-black open:cursor-auto"
							>
								{translationStore.immediate}
                            </label>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="immediate"
								aria-describedby="immediate-description"
								name="immediate"
								type="checkbox"
								class="h-4 w-4 rounded bg-white border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-auto disabled:bg-grey-300 disabled:cursor-not-allowed"
								bind:checked={toggleImmediate}
								on:click={() => handleFilterChange('speed', !toggleImmediate ? 'immediate' : '')}
							/>
						</div>
					</div>
					<!-- Immediate Toggle End -->
				</div>

				<div class="relative basis-1/2 md:basis-1/6 inline-block text-black text-left">
					<span class="isolate w-full inline-flex rounded-md shadow-sm">
						<div
							class="relative peer w-full h-11 rounded-l-[4px] bg-filter-alternate-toggle border-background-900 border flex items-center gap-x-1.5 rounded-l-md p-2.5 uppercase text-xs open:rounded-b-none"
							aria-expanded="false"
							role="button"
							tabindex="-1"
							{...(toggleSort ? { open:'' } : {})}
							on:click={() => toggleSort = !toggleSort}
						>
							<span class="uppercase text-xs pointer-events-none">
								{$casinoVariables.sort ? getSortLabelByValue($casinoVariables.sort) : translationStore.welcomeBonus }
							</span>
						</div>
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
						{...(toggleSort ? { open:'' } : {})}
					>
						<div class="py-1 flex flex-col" role="none">
							{#each sortKeys as key}
								<button
									class="uppercase p-2 text-sm font-medium text-left rounded-md border-grey-100 border bg-white/[.7] data-active:blueFilterBtn data-active:border-misc/[.6]"
									role="menuitem"
									tabindex="-1"
									id="sort-keys"
									on:click={() => handleFilterChange('sort', $sort[key]?.value)}
								>
									{($sort[key]?.label)}
								</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>