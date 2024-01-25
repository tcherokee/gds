<script lang="ts">
    // Import First Party and Third Party Plugins
    import dayjs from 'dayjs'
    import qs from 'qs'

    // Import Types
    import type { Block, CasinoListData, BonusSectionOnly, CasinoListBlock, CasinoData, CasinoAttributes } from "../../../interfaces/common/types"

    // Import Stores
    import { getTranslations } from "../../../stores/addTranslations"
    import { casinos, casinoQsStore, casinoVariables, bonusAmount, wageringReqAmount } from '../../../stores/casinos'
    import { bonusLabels } from '../../../stores/filters'

    // Import Components
    import CasinoFilter from '../filters/casinoFilter.svelte'

    // Import Helpers
    import Image from '../helpers/images.svelte'
    import ReadOnlyRatings from '../helpers/readOnlyRatings.svelte'
    import { welcomeBonus, noDepositBonus } from '../../../lib/casinoBonusLayout'

    // Images
    import ArrowRight from "~icons/kensho-icons/arrow-right"
    import Angle from "~icons/kensho-icons/angle"
    import CircleInfo from "~icons/kensho-icons/circle-info"

    // Query String
    import { casinosQs } from '../../../qs/casinos';

    export let initialCasinos: CasinoListBlock

    const {showLoadMore, showCasinoFilters, numberPerLoadMore, casinosList, casinoSort, casinoFilters} = initialCasinos

    let currentCasinosLength = numberPerLoadMore

    // Set Sort Key in Casino Variables Store
    casinoVariables.setKey('sort', casinoSort || 'ratingAvg:desc')

    // Set bonusKey Key in Casino Variables Store
    casinoVariables.setKey('bonusKey', $bonusLabels[casinoFilters]?.value || 'bonusSection')

    // Tailwind Gradient Object for Dynamic Classes
    const badgesOptions = ([
        "bg-gradient-to-b from-gold-tag-t-gradient to-gold-tag-b-gradient",
        "bg-gradient-to-b from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
        "bg-gradient-to-b from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
    ])
    
    // Flatten Casinos
    const customCasinos: CasinoData[] = casinosList.flatMap((casino: CasinoListData) => casino.casino.data);

    // Get Casino Amounts
    $: bonusAmounts = ($casinos.data?.data ?? customCasinos)
                            .map(casino => casino.attributes[$casinoVariables.bonusKey as keyof BonusSectionOnly]?.bonusAmount) // Extract bonus amount
                            .filter((amount): amount is number => amount !== null && amount !== undefined && amount !== 0) // Remove null, undefined, and 0
                            .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
                            .sort((a, b) => a - b) //Sort from smallest to largest

    // Set bonusAmounts value to bonusAmount store
    $: (bonusAmount.set(bonusAmounts))

    // Get Casino Wagering
    $: wageringReq = ($casinos.data?.data ?? customCasinos)
                            .map(casino => casino.attributes.casinoGeneralInfo?.wageringRequirements)
                            .filter((amount): amount is number => amount !== null && amount !== undefined && amount !== 0)
                            .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
                            .sort((a, b) => a - b) //Sort from smallest to largest

    // Set Wagering Requirements value to Wagering Requirements Store
    $: (wageringReqAmount.set(wageringReq))
    
    // Reset Casino Filters
    const resetCasinoFilters = () => {
        casinoVariables.setKey('limit', 1000)
        casinoVariables.setKey('sort', "ratingAvg:desc")
        casinoVariables.setKey('providers', "")
        casinoVariables.setKey('ids', [])
        casinoVariables.setKey('bonusKey', "")
        casinoVariables.setKey('condition', "")
        casinoVariables.setKey('amount', "")
        casinoVariables.setKey('wagering', "")
        casinoVariables.setKey('speed', "")

        // Set QS Query String to Get Updated Casinos
        const query = qs.stringify(casinosQs($casinoVariables), {encodeValuesOnly: true})

		// Set Qs Store to Query Value
        casinoQsStore.set(`?${query}`)
    }

    $: console.log(customCasinos, bonusAmounts, wageringReq)

</script>

<div>
    <div class="relative xl:container px-2 pb-5">
        <div class="mb-5 pt-2.5">
            <div>
                <div class="text-black relative mb-10 z-20">
                    <CasinoFilter />
                </div>
            </div>
            <div>
                <div class="table-wrapper bg-grey-100 rounded-[6px] overflow-hidden">
                    <table class="w-full overflow-hidden rounded-[6px] mb-[12px] border-spacing-0 border-collapse">
                        <thead class="hidden border-l-[12px] border-r-[12px] border-l-casino-table-header-bkg border-r-casino-table-header-bkg md:table-row-group">
                            <tr class="border-b-[12px] border-b-grey-100">
                                <th scope="col" class="px-3">{$getTranslations.casinoTableHeadingCasinos}</th>
                                <th scope="col" class="px-3">{$getTranslations.casinoTableHeadingRating}</th>
                                <th scope="col" class="px-3">{$getTranslations.casinoTableHeadingBonus}</th>
                                <th scope="col" class="px-3">{$getTranslations.withoutDeposit}</th>
                                <th scope="col" class="px-3">{$getTranslations.casinoTableHeadinRegister}</th>
                            </tr>
                        </thead>
                        <tbody class="text-casino-table-text">
                            <!-- If the casino store is emty, use customCasinos otherwise use casino store -->
                            {#if ($casinos.data?.data ?? customCasinos).length > 0}
                                {#each (showLoadMore ? ($casinos.data?.data ?? customCasinos).slice(0, currentCasinosLength) : ($casinos.data?.data ?? customCasinos)) as casino, i}
                                    <tr class="flex flex-wrap md:table-row border-[12px] border-grey-100 bg-white">
                                        <td class="casino-logo w-1/2 md:w-auto relative overflow-hidden">
                                            {#if casino?.attributes?.Badges} 
                                                <span class="z-10 rotate-45 absolute exclusive-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]">{$getTranslations.exclusive}</span>
                                            {:else if casino?.attributes?.publishedAt && dayjs().diff(casino?.attributes?.publishedAt, 'day') <= 14} 
                                                <span class="z-10 rotate-45 absolute new-casino-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]">{$getTranslations.newCasino}</span>
                                            {/if}
                                            <div class="h-full px-3 py-2 bg-white rounded-tl-lg md:rounded-bl-lg relative">
                                            
                                            {#if i <= 2}
                                                <span class="w-[28px] h-6 absolute flex justify-center items-center p-[2px] top-0 left-[18px] rounded-bl rounded-br text-white text-sm font-bold {badgesOptions[i]}">#{i + 1}</span>
                                            {/if}
                                                
                                                <a
                                                    href={casino?.attributes?.casinoBonus?.bonusUrl}
                                                    class="block rounded border border-[transparent] {i <= 2 && badgesOptions[i]}"
                                                    type="external"
                                                    rel="sponsored"
                                                >
                                                    <Image imageUrl={casino?.attributes?.images?.data?.attributes.url} imageClass="w-full rounded" imageAlt={casino?.attributes?.title} imageWidth={230} imageHeight={100} />
                                                </a>
                                            </div>
                                        </td>
                                        <td class="text-center w-1/2 md:w-auto">
                                            <div class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none">
                                                <div class="ratings">
                                                    <ReadOnlyRatings avgRating={casino?.attributes?.ratingAvg} ratingCount={casino?.attributes?.ratingCount} showVotes={true} />
                                                </div>
                                                <div class="flex items-center">
                                                    <a
                                                        class="casino-name text-[14px] text-grey-500 mr-[11px]"
                                                        href={`/casino/recensione/${casino?.attributes?.slug}`}
                                                    >
                                                        <span class="hidden sm:inline-flex sm:pr-1">{casino?.attributes?.title}</span>
                                                        <span class="underline">{$getTranslations.review}</span>
                                                    </a>
                                                    <ArrowRight class="w-[14px]" />
                                                </div>
                                            </div>
                                        </td>
                                        <td class="w-full md:w-auto bg-white">
                                            <div class="flex flex-col items-center justify-center h-full px-3 py-3">
                                                <div
                                                    class="text-[#7C838D] text-center text-sm leading-[18px] font-bold mb-2 md:hidden"
                                                >
                                                    {$getTranslations.casinoTableHeadingBonus}
                                                </div>
                                                <a
                                                    href={casino?.attributes?.casinoBonus?.bonusUrl}
                                                    class="flex underline text-center"
                                                    type="external"
                                                    rel="sponsored"
                                                >
                                                    {@html welcomeBonus(casino)}
                                                </a>
                                                <span class="hidden md:flex items-center text-xs text-grey-500 underline mr-[7px]" title={casino?.attributes?.bonusSection?.termsConditions} data-tooltip-placement="left">{$getTranslations.wageringRequirement} <CircleInfo width="12px" height="12px" class="fill-text-grey-500 ml-1" /></span>
                                                <div class="wrap-collabsible w-full md:hidden mt-2">
                                                    <input id={`welcomeBonus${i}`} class="toggle hidden peer" type="checkbox" />
                                                    <label for={`welcomeBonus${i}`} class="flex items-center justify-between text-sm text-grey-500 group" tabindex="0">
                                                        {$getTranslations.wageringRequirement}
                                                        <Angle class="fill-grey-500 group-open:rotate-180" height="20px" width="18px"/>
                                                    </label>
                                                    <div class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max">
                                                        <div class="content-inner text-grey-500 mt-4">
                                                            {@html casino?.attributes?.bonusSection?.termsConditions}
                                                        </div>
                                                    </div>
                                                </div>
                                                    
                                            </div>
                                        </td>
                                        <td class="w-full md:w-auto bg-gradient-to-r from-no-deposit-gradient/20 via-white/30 via-[percentage:30%_70%] to-no-deposit-gradient/20">
                                            <div class="flex flex-col items-center justify-center h-full px-3 py-3">
                                                <div
                                                    class="text-[#7C838D] text-center text-sm leading-[18px] font-bold mb-2 md:hidden"
                                                >
                                                    {$getTranslations.withoutDeposit}
                                                </div>
                                                {#if noDepositBonus(casino)?.bonus}
                                                    <a
                                                        href={casino?.attributes?.casinoBonus?.bonusUrl}
                                                        class="flex underline text-center"
                                                        type="external"
                                                        rel="sponsored"
                                                    >
                                                        {@html noDepositBonus(casino)?.bonus}
                                                    </a>
                                                    <span class="hidden md:flex items-center text-xs text-grey-500 underline mr-[7px]" title={noDepositBonus(casino)?.terms} data-tooltip-placement="left">{$getTranslations.wageringRequirement} <CircleInfo width="12px" height="12px" class="fill-text-grey-500 ml-1" /></span>
                                                    <div class="wrap-collabsible w-full md:hidden mt-2">
                                                        <input id={`noDepositBonus${i}`} class="toggle hidden peer" type="checkbox" />
                                                        <label for={`noDepositBonus${i}`} class="flex items-center justify-between text-sm text-grey-500 group peer-checked:open" tabindex="0">
                                                            {$getTranslations.wageringRequirement}
                                                            <Angle class="fill-grey-500 group-[.open]:rotate-180" height="20px" width="18px"/>
                                                        </label>
                                                        <div class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max">
                                                            <div class="content-inner text-grey-500 mt-4">
                                                                {@html noDepositBonus(casino)?.terms}
                                                            </div>
                                                        </div>
                                                    </div>
                                                {:else}
                                                    <span> - </span>
                                                {/if}
                                            </div>
                                        </td>
                                        <td class="w-full !border-l-0 md:w-auto">
                                            <div class="h-full py-3 bg-white rounded-tr-none rounded-br-lg rounded-bl-lg md:rounded-tr-lg md:rounded-bl-none">
                                                <div class="h-full px-3 flex flex-col justify-end items-center sm:justify-center">
                                                    {#if casino?.attributes?.casinoBonus?.bonusCode} 
                                                        <div class="mb-[7px] text-[#212529] text-[14px] font-bold">{$getTranslations.bonusCode}</div>
                                                    {/if}
                                                    {#if casino?.attributes?.casinoBonus?.bonusUrl}
                                                        <a
                                                            href={casino?.attributes?.casinoBonus?.bonusUrl}
                                                            class="btn btn-misc uppercase text-white w-full mb-[7px] font-extrabold"
                                                            type="external"
                                                            rel="sponsored"
                                                        >
                                                            {casino?.attributes?.casinoBonus?.bonusCode ? casino?.attributes?.casinoBonus?.bonusCode : $getTranslations.visitSite}
                                                        </a>
                                                    {/if}
                                                    <span class="hidden md:flex items-center text-xs text-grey-500 underline mr-[7px]" title={casino?.attributes?.termsAndConditions?.copy} data-tooltip-placement="left">{$getTranslations.termsConditions} <CircleInfo width="12px" height="12px" class="fill-text-grey-500 ml-1" /></span>
                                                    <div class="wrap-collabsible w-full md:hidden mt-2">
                                                        <input id={`bonus${i}`} class="toggle hidden peer" type="checkbox" />
                                                        <label for={`bonus${i}`} class="flex items-center justify-between text-sm text-grey-500 group" tabindex="0">
                                                            {$getTranslations.wageringRequirement}
                                                            <Angle class="fill-grey-500 group-open:rotate-180" height="20px" width="18px"/>
                                                        </label>
                                                        <div class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max">
                                                            <div class="content-inner text-grey-500 mt-4">
                                                                {casino?.attributes?.termsAndConditions?.copy}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            {:else}
                                    <tr class="border-b-[12px] border-b-grey-100">
                                        <td colspan="5">
                                            <div
                                                class="flex p-5 bg-transparent sm:glowy-bkg sm:shadow-none items-center justify-center flex-col mt-5 rounded-[4px] shadow-[0_0.125rem_0.25rem_rgba($black,0.075)]"
                                            >
                                                <h6 class="!mb-5">Nessun risultato trovato per i tuoi criteri di ricerca</h6>

                                                <button class="btn bg-[#EF4444] rounded-[6px]" on:click={resetCasinoFilters}>
                                                    CANCELLA TUTTI I FILTRI
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Load More Button -->
{#if showLoadMore && ($casinos.data?.data ?? customCasinos).length > currentCasinosLength }
	<div class="d-grid gap-2 d-md-block flex w-full justify-center mb-10">
        <button
            class="btn capitalize btn-secondary min-w-[300px] md:min-w-[500px]"
            on:click={() => currentCasinosLength = currentCasinosLength + numberPerLoadMore}
        >
            {$getTranslations.expandList}
        </button>
	</div>
{/if}

<style lang="postcss">
    table {
        thead {
            th {
                @apply text-white text-base text-center bg-casino-table-header-bkg font-bold capitalize py-[11px]
            }
        }

        tbody {
            tr {
                td {
                    @apply rounded-none md:rounded-lg p-0 h-auto md:h-[120px] md:max-w-[256px] xl:min-w-[170px] first:bg-grey-100 last:bg-grey-100;
                }
            }
        }
    }
</style>