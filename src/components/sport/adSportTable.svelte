<script lang="ts">
  // Import First Party and Third Party Plugins
  import dayjs from "dayjs";
  // Import Types
  import type {
    SportData,
    TranslationData
  } from "../../../interfaces/common/types";
  // Helpers
  import { urlTranslate } from "../../../utils/data-store.util";
  import Image from "../helpers/images.svelte";
  import Link from "../helpers/link.svelte";
// Images
  import Angle from "~icons/kensho-icons/angle";
  import CircleInfo from "~icons/kensho-icons/circle-info";
  // Query String

  export let translations: TranslationData;

  export let sports: {data: SportData[]};

  const siteID = import.meta.env.PUBLIC_SITE_ID;
  const siteURL: string = `${urlTranslate[siteID as keyof typeof urlTranslate]["sport-pages"]}/`;

  // Tailwind Gradient Object for Dynamic Classes
  const badgesOptions = [
    "bg-gradient-to-b from-gold-tag-t-gradient to-gold-tag-b-gradient",
    "bg-gradient-to-b from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
    "bg-gradient-to-b from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
  ];
</script>

<div>
  <div class="relative xl:container px-2 pb-5">
    <div class="mb-5 pt-2.5">
      <div>
        <div
          class="table-wrapper bg-casino-table-bkg rounded-[6px] overflow-hidden"
        >
          <table
            class="w-full mb-2.5 overflow-hidden rounded-[6px] border-spacing-0 border-collapse"
          >
            <tbody class="text-casino-table-text">
              <!-- If the casino store is emty, use customCasinos otherwise use casino store -->
              {#if sports.data.length > 0}
                {#each sports.data as sport, i (sport.id)}
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
                      {:else if sport?.attributes?.createdAt && dayjs().diff(sport?.attributes?.createdAt, "day") <= 14}
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
                    <td class="w-full md:w-auto bg-white">
                      <div class="flex ml-5 font-bold">
                        <Link
                          externalInNewTab={true}
                          class="text-decoration-underline text-blue-300"
                          href={`${sport?.attributes?.sportBonus?.bonusUrl}`}
                        >
                          {sport?.attributes?.sportBonus?.bonusLabel}
                        </Link>
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
