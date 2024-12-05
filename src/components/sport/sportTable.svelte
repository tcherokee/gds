<script lang="ts">
  // Import First Party and Third Party Plugins
  import dayjs from "dayjs";
  import qs from "qs";

  // Import Types
  import type {
    BonusSectionOnly,
    SportData,
    SportListBlock,
    SportListData,
    TProviderAttributesOnly,
    TranslationData,
  } from "../../../interfaces/common/types";
  // Import Stores

  import {
    bonusAmount,
    sportVariables,
    sports,
    wageringReqAmount,
  } from "../../../stores/sports";
  import { bonusLabels } from "../../../stores/filters";

  // Import Components
  import DesktopSportFilter from "../filters/desktopSportFilter.svelte";
  import MobileSportFilter from "../filters/mobileSportFilter.svelte";

  // Helpers
  import { urlTranslate } from "../../../utils/data-store.util";
  import { noDepositBonus, welcomeBonus } from "../../../lib/casinoBonusLayout";
  import { sortOptions } from "../../../stores/sortFilters";
  import Image from "../helpers/images.svelte";
  import Link from "../helpers/link.svelte";
  import ReadOnlyRatings from "../helpers/readOnlyRatings.svelte";

  // Images
  import Angle from "~icons/kensho-icons/angle";
  import ArrowRight from "~icons/kensho-icons/arrow-right";
  import CircleInfo from "~icons/kensho-icons/circle-info";

  // Query String
  import { sportsQs } from "../../../qs/sports";
  import { getTranslations } from "../../../stores/addTranslations";

  export let initialSports: SportListBlock;
  export let translations: TranslationData;
  export let showSportTableHeader: boolean;

  const siteID = import.meta.env.PUBLIC_SITE_ID;
  const siteURL: string = `${urlTranslate[siteID as keyof typeof urlTranslate]["sport-pages"]}/`;

  const {
    showLoadMore,
    showSportFilters,
    numberPerLoadMore,
    sportsList,
    sportSort,
    sportFilters,
  } = initialSports;

  if (showSportTableHeader === null) showSportTableHeader = true; //ensures that when this flag is null the table header shows

  let currentCasinosLength = numberPerLoadMore;

  // Set Sort Key in Casino Variables Store
  sportVariables.setKey("sort", $sortOptions[sportSort] || "ratingAvg:desc");

  // Set bonusKey Key in Casino Variables Store
  sportVariables.setKey(
    "bonusKey",
    $bonusLabels[sportFilters]?.value || "bonusSection"
  );

  // Tailwind Gradient Object for Dynamic Classes
  const badgesOptions = [
    "bg-gradient-to-b from-gold-tag-t-gradient to-gold-tag-b-gradient",
    "bg-gradient-to-b from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
    "bg-gradient-to-b from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
  ];

  // Flatten Casinos
  const customSports: SportData[] = sportsList
    .flatMap((sport: SportListData) => sport.sport.data)
    .filter((elem) => elem);

  // Get Casino Amounts
  $: {
    getTranslations.set(translations);
    const bonusAmounts = ($sports.data?.data ?? customSports)
      .map(
        (sport) =>
          sport?.attributes[$sportVariables.bonusKey as keyof BonusSectionOnly]
            ?.bonusAmount
      ) // Extract bonus amount
      .filter(
        (amount): amount is number =>
          amount !== null && amount !== undefined && amount !== 0
      ) // Remove null, undefined, and 0
      .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
      .sort((a, b) => a - b); //Sort from smallest to largest

    // Set bonusAmounts value to bonusAmount store
    bonusAmount.set(bonusAmounts);

    const wageringReq = ($sports.data?.data ?? customSports)
      .map(
        (casino) => casino?.attributes.sportGeneralInfo?.wageringRequirements
      )
      .filter(
        (amount): amount is number =>
          amount !== null && amount !== undefined && amount !== 0
      )
      .filter((amount, index, self) => self.indexOf(amount) === index) // Remove duplicates
      .sort((a, b) => a - b); //Sort from smallest to largest

    // Set Wagering Requirements value to Wagering Requirements Store
    wageringReqAmount.set(wageringReq);
  }

  // Reset Casino Filters
  const resetCasinoFilters = () => {
    sportVariables.setKey("limit", 1000);
    sportVariables.setKey("sort", "ratingAvg:desc");
    sportVariables.setKey("ids", []);
    sportVariables.setKey("bonusKey", "");
    sportVariables.setKey("condition", "");
    sportVariables.setKey("amount", "");
    sportVariables.setKey("wagering", "");
    sportVariables.setKey("speed", "");

    // Set QS Query String to Get Updated Sports
    const query = qs.stringify(sportsQs($sportVariables), {
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
          <MobileSportFilter translationStore={translations} />
          <DesktopSportFilter translationStore={translations} />
        </div>
      </div>
      <div>
        <div
          class="table-wrapper bg-casino-table-bkg rounded-[6px] overflow-hidden"
        >
          <table
            class="w-full mb-2.5 overflow-hidden rounded-[6px] border-spacing-0 border-collapse"
          >
            {#if showSportTableHeader}
              <thead
                class="hidden border-l-[12px] border-r-[12px] border-l-casino-table-header-bkg border-r-casino-table-header-bkg md:table-row-group"
              >
                <tr class="border-b-[12px] border-b-grey-100">
                  <th scope="col" class="px-3"
                    >{translations?.sportTableHeadingCasinos}</th
                  >
                  <th scope="col" class="px-3"
                    >{translations?.sportTableHeadingRating}</th
                  >
                  <th scope="col" class="px-3"
                    >{translations?.sportTableHeadingBonus}</th
                  >
                  <th scope="col" class="px-3"
                    >{translations?.withoutDeposit}</th
                  >
                  <th scope="col" class="px-3"
                    >{translations?.sportTableHeadinRegister}</th
                  >
                </tr>
              </thead>
            {/if}
            <tbody class="text-casino-table-text">
              <!-- If the casino store is emty, use customCasinos otherwise use casino store -->
              {#if ($sports.data?.data ?? customSports).length > 0}
                {#each showLoadMore ? ($sports.data?.data ?? customSports).slice(0, currentCasinosLength) : $sports.data?.data ?? customSports as sport, i (sport.id)}
                  <tr
                    class="flex flex-wrap md:table-row border-[12px] border-casino-table-tr-border bg-white"
                  >
                    <td
                      class="casino-logo w-1/2 md:w-auto relative overflow-hidden md:w-[210px] md:max-w-[210px]"
                    >
                      {#if sport?.attributes?.Badges}
                        <span
                          class="z-10 rotate-45 absolute exclusive-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]"
                          >{translations?.exclusive}</span
                        >
                      {:else if sport?.attributes?.publishedAt && dayjs().diff(sport?.attributes?.publishedAt, "day") <= 14}
                        <span
                          class="z-10 rotate-45 absolute new-casino-badge text-white text-xs px-[36.4px] uppercase top-[25px] -right-[40px]"
                          >{translations?.newCasino}</span
                        >
                      {/if}
                      <div
                        class="h-full flex items-center px-3 py-2 bg-white rounded-tl-lg md:rounded-bl-lg relative max-w-[368px] {i ===
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
                          href={`${sport?.attributes?.sportBonus?.bonusUrl}`}
                          classes="block rounded border border-[transparent] {i <=
                            2 && badgesOptions[i]}"
                          type="external"
                          rel="sponsored"
                        >
                          <Image
                            imageUrl={sport?.attributes?.images?.data
                              ?.attributes.url}
                            imageClass="w-full rounded"
                            imageAlt={sport?.attributes?.title}
                            imageWidth={206}
                            imageHeight={88}
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
                            avgRating={sport?.attributes?.ratingAvg}
                            ratingCount={sport?.attributes?.ratingCount}
                            {translations}
                          />
                        </div>
                        <div class="flex items-center">
                          <Link
                            classes="casino-name text-[14px] text-grey-500 mr-[11px]"
                            href={`${siteURL}${sport?.attributes?.slug}/`}
                          >
                            <span class="hidden sm:inline-flex sm:pr-1"
                              >{sport?.attributes?.title}</span
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
                          href={`${sport?.attributes?.sportBonus?.bonusUrl}`}
                          classes="flex underline text-center  font-lato"
                          type="external"
                          rel="sponsored"
                        >
                          {@html welcomeBonus(sport, translations?.reloadBonus)}
                        </Link>
                        <span
                          class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                          title={sport?.attributes?.bonusSection
                            ?.termsConditions}
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
                              {@html sport?.attributes?.bonusSection
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
                        {#if noDepositBonus(sport)?.bonus}
                          <Link
                            href={`${sport?.attributes?.sportBonus?.bonusUrl}`}
                            classes="flex underline text-center font-lato"
                            type="external"
                            rel="sponsored"
                          >
                            {@html noDepositBonus(sport, {
                              withoutDeposit: translations?.withoutDeposit,
                              freeSpins: translations?.freeSpins,
                            })?.bonus}
                          </Link>
                          <span
                            class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                            title={noDepositBonus(sport, {
                              withoutDeposit: translations?.withoutDeposit,
                              freeSpins: translations?.freeSpins,
                            })?.terms}
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
                                {@html noDepositBonus(sport, {
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
                          {#if sport?.attributes?.sportBonus?.bonusCode}
                            <div
                              class="mb-[7px] text-[#212529] text-[14px] font-bold"
                            >
                              {translations?.bonusCode}
                            </div>
                          {/if}
                          {#if sport?.attributes?.sportBonus?.bonusUrl}
                            <Link
                              href={`${sport?.attributes?.sportBonus?.bonusUrl}`}
                              classes="btn btn-misc uppercase text-white w-full mb-[7px] font-extrabold"
                              type="external"
                              rel="sponsored"
                            >
                              {sport?.attributes?.sportBonus?.bonusCode
                                ? sport?.attributes?.sportBonus?.bonusCode
                                : translations?.visitSite}
                            </Link>
                          {/if}
                          <span
                            class="hidden md:flex items-center cursor-pointer text-xs text-grey-500 underline mr-[7px]"
                            title={sport?.attributes?.termsAndConditions?.copy}
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
                                {@html sport?.attributes?.termsAndConditions
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
  {#if showLoadMore && ($sports.data?.data ?? customSports).length > currentCasinosLength}
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
