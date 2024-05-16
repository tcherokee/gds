<script lang="ts">
  // Import First Party and Third Party Plugins
  import dayjs from "dayjs";
  import qs from "qs";
  // Import Types
  import type {
    BonusSectionOnly,
    CasinoData,
    CasinoListBlock,
    CasinoListData,
    TProviderAttributesOnly,
    TranslationData,
  } from "../../../interfaces/common/types";
  // Import Stores

  import {
    bonusAmount,
    casinoQsStore,
    casinoVariables,
    casinos,
    providers,
    wageringReqAmount,
  } from "../../../stores/casinos";
  import { bonusLabels } from "../../../stores/filters";
  // Import Components
  import DesktopCasinoFilter from "../filters/desktopCasinoFilter.svelte";
  import MobileCasinoFilter from "../filters/mobileCasinoFilter.svelte";
  // Import Helpers
  import { noDepositBonus, welcomeBonus } from "../../../lib/casinoBonusLayout";
  import { sortOptions } from "../../../stores/sortFilters";
  import Image from "../helpers/images.svelte";
  import Link from "../helpers/link.svelte";
  import MediaQuery from "../helpers/mediaQuery.svelte";
  import ReadOnlyRatings from "../helpers/readOnlyRatings.svelte";
  // Images
  import Angle from "~icons/kensho-icons/angle";
  import ArrowRight from "~icons/kensho-icons/arrow-right";
  import CircleInfo from "~icons/kensho-icons/circle-info";
  // Query String
  import { casinosQs } from "../../../qs/casinos";
  import { getTranslations } from "../../../stores/addTranslations";

  export let initialCasinos: CasinoListBlock;
  export let translations: TranslationData;
  export let slotProviders: TProviderAttributesOnly[] = [];

  const {
    showLoadMore,
    showCasinoFilters,
    numberPerLoadMore,
    casinosList,
    casinoSort,
    casinoFilters,
  } = initialCasinos;

  let currentCasinosLength = numberPerLoadMore;

  // Set Sort Key in Casino Variables Store
  casinoVariables.setKey("sort", $sortOptions[casinoSort] || "ratingAvg:desc");

  // Set bonusKey Key in Casino Variables Store
  casinoVariables.setKey(
    "bonusKey",
    $bonusLabels[casinoFilters]?.value || "bonusSection"
  );

  // Tailwind Gradient Object for Dynamic Classes
  const badgesOptions = [
    "bg-gradient-to-b from-gold-tag-t-gradient to-gold-tag-b-gradient",
    "bg-gradient-to-b from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
    "bg-gradient-to-b from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
  ];

  // Flatten Casinos
  const customCasinos: CasinoData[] = casinosList.flatMap(
    (casino: CasinoListData) => casino.casino.data
  );

  // Get Casino Amounts
  $: bonusAmounts = ($casinos.data?.data ?? customCasinos)
    .map(
      (casino) =>
        casino?.attributes[$casinoVariables.bonusKey as keyof BonusSectionOnly]
          ?.bonusAmount
    ) // Extract bonus amount
    .filter(
      (amount): amount is number =>
        amount !== null && amount !== undefined && amount !== 0
    ) // Remove null, undefined, and 0
    .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
    .sort((a, b) => a - b); //Sort from smallest to largest

  // Set bonusAmounts value to bonusAmount store
  $: bonusAmount.set(bonusAmounts);

  // Get Casino Wagering
  $: wageringReq = ($casinos.data?.data ?? customCasinos)
    .map((casino) => casino?.attributes.casinoGeneralInfo?.wageringRequirements)
    .filter(
      (amount): amount is number =>
        amount !== null && amount !== undefined && amount !== 0
    )
    .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
    .sort((a, b) => a - b); //Sort from smallest to largest

  // Set Wagering Requirements value to Wagering Requirements Store
  $: wageringReqAmount.set(wageringReq);

  $: {
    getTranslations.set(translations);
    providers.set(slotProviders);
  }

  // Reset Casino Filters
  const resetCasinoFilters = () => {
    casinoVariables.setKey("limit", 1000);
    casinoVariables.setKey("sort", "ratingAvg:desc");
    // casinoVariables.setKey("providers", []);
    casinoVariables.setKey("ids", []);
    casinoVariables.setKey("bonusKey", "");
    casinoVariables.setKey("condition", "");
    casinoVariables.setKey("amount", "");
    casinoVariables.setKey("wagering", "");
    casinoVariables.setKey("speed", "");

    // Set QS Query String to Get Updated Casinos
    const query = qs.stringify(casinosQs($casinoVariables), {
      encodeValuesOnly: true,
    });

    // Set Qs Store to Query Value
    // casinoQsStore.set(`?${query}`);
  };
</script>

<div>
  <div class="relative xl:container px-2 pb-5">
    <div class="mb-5 pt-2.5">
      <div>
        <div class="text-black relative mb-10 z-20">
          <MediaQuery query="(max-width: 768px)" let:matches>
            {#if matches}
              <MobileCasinoFilter translationStore={translations} />
            {:else}
              <DesktopCasinoFilter translationStore={translations} />
            {/if}
          </MediaQuery>
        </div>
      </div>
      <div>
        <div
          class="table-wrapper bg-casino-table-bkg rounded-[6px] overflow-hidden"
        >
          <table
            class="w-full mb-2.5 overflow-hidden rounded-[6px] border-spacing-0 border-collapse"
          >
            <thead
              class="hidden border-l-[12px] border-r-[12px] border-l-casino-table-header-bkg border-r-casino-table-header-bkg md:table-row-group"
            >
              <tr class="border-b-[12px] border-b-grey-100">
                <th scope="col" class="px-3"
                  >{translations?.casinoTableHeadingCasinos}</th
                >
                <th scope="col" class="px-3"
                  >{translations?.casinoTableHeadingRating}</th
                >
                <th scope="col" class="px-3"
                  >{translations?.casinoTableHeadingBonus}</th
                >
                <th scope="col" class="px-3">{translations?.withoutDeposit}</th>
                <th scope="col" class="px-3"
                  >{translations?.casinoTableHeadinRegister}</th
                >
              </tr>
            </thead>
            <tbody class="text-casino-table-text">
              <!-- If the casino store is emty, use customCasinos otherwise use casino store -->
              {#if ($casinos.data?.data ?? customCasinos).length > 0}
                {#each showLoadMore ? ($casinos.data?.data ?? customCasinos).slice(0, currentCasinosLength) : $casinos.data?.data ?? customCasinos as casino, i}
                  <tr
                    class="flex flex-wrap md:table-row border-[12px] border-casino-table-tr-border bg-white"
                  >
                    <td
                      class="casino-logo w-1/2 md:w-auto relative overflow-hidden"
                    >
                      {#if casino?.attributes?.Badges}
                        <span
                          class="z-10 rotate-45 absolute exclusive-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]"
                          >{translations?.exclusive}</span
                        >
                      {:else if casino?.attributes?.publishedAt && dayjs().diff(casino?.attributes?.publishedAt, "day") <= 14}
                        <span
                          class="z-10 rotate-45 absolute new-casino-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]"
                          >{translations?.newCasino}</span
                        >
                      {/if}
                      <div
                        class="h-full px-3 py-2 bg-white rounded-tl-lg md:rounded-bl-lg relative {i ===
                        0
                          ? 'casino-logo__first'
                          : i === 1
                            ? 'casino-logo__second'
                            : i === 2
                              ? 'casino-logo__third'
                              : ''}"
                      >
                        {#if i <= 2}
                          <span
                            class="casino-logo__tag w-[28px] h-6 absolute flex justify-center items-center p-[2px] top-0 left-[18px] rounded-bl rounded-br text-white text-sm font-bold {badgesOptions[
                              i
                            ]}">#{i + 1}</span
                          >
                        {/if}

                        <Link
                          href={`${casino?.attributes?.casinoBonus?.bonusUrl}`}
                          classes="block rounded border border-[transparent] {i <=
                            2 && badgesOptions[i]}"
                          type="external"
                          rel="sponsored"
                        >
                          <Image
                            imageUrl={casino?.attributes?.images?.data
                              ?.attributes.url}
                            imageClass="w-full rounded"
                            imageAlt={casino?.attributes?.title}
                            imageWidth={230}
                            imageHeight={100}
                          />
                        </Link>
                      </div>
                    </td>
                    <td class="text-center w-1/2 md:w-auto">
                      <div
                        class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none"
                      >
                        <div class="ratings">
                          <ReadOnlyRatings
                            avgRating={casino?.attributes?.ratingAvg}
                            ratingCount={casino?.attributes?.ratingCount}
                            showVotes={true}
                            {translations}
                          />
                        </div>
                        <div class="flex items-center">
                          <Link
                            classes="casino-name text-[14px] text-grey-500 mr-[11px]"
                            href={`/casino/recensione/${casino?.attributes?.slug}/`}
                          >
                            <span class="hidden sm:inline-flex sm:pr-1"
                              >{casino?.attributes?.title}</span
                            >
                            <span class="underline">{translations?.review}</span
                            >
                          </Link>
                          <ArrowRight class="w-[14px]" />
                        </div>
                      </div>
                    </td>
                    <td class="w-full md:w-auto bg-white">
                      <div
                        class="flex flex-col items-center justify-center h-full px-3 py-3"
                      >
                        <div
                          class="text-[#7C838D] text-center text-sm leading-[18px] font-bold mb-2 md:hidden"
                        >
                          {translations?.casinoTableHeadingBonus}
                        </div>
                        <Link
                          href={`${casino?.attributes?.casinoBonus?.bonusUrl}`}
                          classes="flex underline text-center  font-lato"
                          type="external"
                          rel="sponsored"
                        >
                          {@html welcomeBonus(
                            casino,
                            translations?.reloadBonus
                          )}
                        </Link>
                        <span
                          class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                          title={casino?.attributes?.bonusSection?.termsConditions}
                          data-tooltip-placement="left"
                        >
                          {translations?.wageringRequirement}
                          <CircleInfo
                            width="12px"
                            height="12px"
                            class="fill-text-grey-500 ml-1"
                          />
                        </span>
                        <div class="wrap-collabsible w-full md:hidden mt-2">
                          <input
                            id={`welcomeBonus${i}`}
                            class="toggle hidden peer"
                            type="checkbox"
                          />
                          <label
                            for={`welcomeBonus${i}`}
                            class="flex items-center justify-between text-sm text-grey-500 group"
                            tabindex="0"
                          >
                            {translations?.wageringRequirement}
                            <Angle
                              class="fill-grey-500 group-open:rotate-180"
                              height="20px"
                              width="18px"
                            />
                          </label>
                          <div
                            class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max"
                          >
                            <div class="content-inner text-grey-500 mt-4">
                              {@html casino?.attributes?.bonusSection
                                ?.termsConditions}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="w-full md:w-auto bg-gradient-to-r from-no-deposit-gradient/20 via-white/30 via-[percentage:30%_70%] to-no-deposit-gradient/20"
                    >
                      <div
                        class="flex flex-col items-center justify-center h-full px-3 py-3"
                      >
                        <div
                          class="text-[#7C838D] text-center text-sm leading-[18px] font-bold mb-2 md:hidden"
                        >
                          {translations?.withoutDeposit}
                        </div>
                        {#if noDepositBonus(casino)?.bonus}
                          <Link
                            href={`${casino?.attributes?.casinoBonus?.bonusUrl}`}
                            classes="flex underline text-center font-lato"
                            type="external"
                            rel="sponsored"
                          >
                            {@html noDepositBonus(casino, {
                              withoutDeposit: translations?.withoutDeposit,
                              freeSpins: translations?.freeSpins,
                            })?.bonus}
                          </Link>
                          <span
                            class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                            title={noDepositBonus(casino, {withoutDeposit: translations?.withoutDeposit,
                              freeSpins: translations?.freeSpins,})?.terms}
                            data-tooltip-placement="left"
                          >
                            {translations?.wageringRequirement}
                            <CircleInfo
                              width="12px"
                              height="12px"
                              class="fill-text-grey-500 ml-1"
                            />
                          </span>
                          <div class="wrap-collabsible w-full md:hidden mt-2">
                            <input
                              id={`noDepositBonus${i}`}
                              class="toggle hidden peer"
                              type="checkbox"
                            />
                            <label
                              for={`noDepositBonus${i}`}
                              class="flex items-center justify-between text-sm text-grey-500 group peer-checked:open"
                              tabindex="0"
                            >
                              {translations?.wageringRequirement}
                              <Angle
                                class="fill-grey-500 group-[.open]:rotate-180"
                                height="20px"
                                width="18px"
                              />
                            </label>
                            <div
                              class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max"
                            >
                              <div class="content-inner text-grey-500 mt-4">
                                {@html noDepositBonus(casino, {
                                  withoutDeposit: translations?.withoutDeposit,
                                  freeSpins: translations?.freeSpins,
                                })?.terms}
                              </div>
                            </div>
                          </div>
                        {:else}
                          <span> - </span>
                        {/if}
                      </div>
                    </td>
                    <td class="w-full !border-l-0 md:w-auto">
                      <div
                        class="h-full py-3 bg-white rounded-tr-none rounded-br-lg rounded-bl-lg md:rounded-tr-lg md:rounded-bl-none"
                      >
                        <div
                          class="h-full px-3 flex flex-col justify-end items-center sm:justify-center"
                        >
                          {#if casino?.attributes?.casinoBonus?.bonusCode}
                            <div
                              class="mb-[7px] text-[#212529] text-[14px] font-bold"
                            >
                              {translations?.bonusCode}
                            </div>
                          {/if}
                          {#if casino?.attributes?.casinoBonus?.bonusUrl}
                            <Link
                              href={`${casino?.attributes?.casinoBonus?.bonusUrl}`}
                              classes="btn btn-misc uppercase text-white w-full mb-[7px] font-extrabold"
                              type="external"
                              rel="sponsored"
                            >
                              {casino?.attributes?.casinoBonus?.bonusCode
                                ? casino?.attributes?.casinoBonus?.bonusCode
                                : translations?.visitSite}
                            </Link>
                          {/if}
                          <span
                            class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                            title={casino?.attributes?.termsAndConditions?.copy}
                            data-tooltip-placement="left"
                          >
                            {translations?.termsConditions}
                            <CircleInfo
                              width="12px"
                              height="12px"
                              class="fill-text-grey-500 ml-1"
                            />
                          </span>
                          <div class="wrap-collabsible w-full md:hidden mt-2">
                            <input
                              id={`bonus${i}`}
                              class="toggle hidden peer"
                              type="checkbox"
                            />
                            <label
                              for={`bonus${i}`}
                              class="flex items-center justify-between text-sm text-grey-500 group"
                              tabindex="0"
                            >
                              {translations?.termsConditions}
                              <Angle
                                class="fill-grey-500 group-open:rotate-180"
                                height="20px"
                                width="18px"
                              />
                            </label>
                            <div
                              class="max-h-0 overflow-hidden transition-all peer-checked:max-h-max"
                            >
                              <div class="content-inner text-grey-500 mt-4">
                                {@html casino?.attributes?.termsAndConditions
                                  ?.copy}
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
                      <h6 class="!mb-5">
                        Nessun risultato trovato per i tuoi criteri di ricerca
                      </h6>

                      <button
                        class="btn bg-[#EF4444] rounded-[6px]"
                        on:click={resetCasinoFilters}
                      >
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

  <!-- Load More Button -->
  {#if showLoadMore && ($casinos.data?.data ?? customCasinos).length > currentCasinosLength}
    <div class="d-grid gap-2 d-md-block flex w-full justify-center mb-10">
      <button
        class="btn capitalize btn-secondary min-w-[300px] md:min-w-[500px]"
        on:click={() =>
          (currentCasinosLength = currentCasinosLength + numberPerLoadMore)}
      >
        {translations?.expandList}
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  table {
    thead {
      th {
        @apply text-white text-base text-center bg-casino-table-header-bkg font-bold capitalize py-[11px];
      }
    }

    tbody {
      tr {
        td {
          @apply rounded-none md:rounded-lg p-0 h-auto md:h-[120px] md:max-w-[256px] xl:min-w-[170px] first:bg-grey-100 last:bg-grey-100;
          &.casino-logo {
            :global(a) {
              @apply border border-[transparent];
            }
            .casino-logo__first {
              :global(a) {
                background: linear-gradient(to bottom, #ffd976, #ffbb38);
              }
              .casino-logo__tag {
                background: linear-gradient(to bottom, #ffd976, #ffbb38);
                box-shadow:
                  0px 0px 4px #ffbd3b,
                  0px 1px 6px rgba(16, 24, 40, 0.1);
              }
            }
            .casino-logo__second {
              :global(a) {
                background: linear-gradient(to bottom, #dbe5ef, #b1bbc6);
              }
              .casino-logo__tag {
                background: linear-gradient(to bottom, #dbe5ef, #b1bbc6);
                box-shadow:
                  0px 0px 4px #d7e1eb,
                  0px 1px 6px rgba(16, 24, 40, 0.1);
              }
            }
            .casino-logo__third {
              :global(a) {
                background: linear-gradient(to bottom, #de7d45, #9b4e22);
              }
              .casino-logo__tag {
                background: linear-gradient(to bottom, #de7d45, #9b4e22);
                box-shadow:
                  0px 0px 4px #d77842,
                  0px 1px 6px rgba(16, 24, 40, 0.1);
              }
            }
          }
        }
      }
    }
  }
</style>
