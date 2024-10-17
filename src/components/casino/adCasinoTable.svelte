<script lang="ts">
import dayjs from "dayjs";
import { noDepositBonus } from '../../../lib/casinoBonusLayout'

// Components
import Image from "../helpers/images.svelte";
import Link from "../helpers/link.svelte";

  // Images
  import Angle from "~icons/kensho-icons/angle";
  import ArrowRight from "~icons/kensho-icons/arrow-right";
  import CircleInfo from "~icons/kensho-icons/circle-info";

export let casinos
export let translations

  // Tailwind Gradient Object for Dynamic Classes
  const badgesOptions = [
    "bg-gradient-to-b from-gold-tag-t-gradient to-gold-tag-b-gradient",
    "bg-gradient-to-b from-silver-tag-t-gradient to-silver-tag-b-gradient text-body-text",
    "bg-gradient-to-b from-bronze-tag-t-gradient to-bronze-tag-b-gradient",
  ];

</script>

<div class="table-wrapper bg-casino-table-bkg rounded-[6px] overflow-hidden relative z-[8] mb-5">
	<table class="w-full mb-2.5 overflow-hidden rounded-[6px] border-spacing-0 border-collapse">
		 <tbody class="text-casino-table-text">
              <!-- If the casino store is emty, use customCasinos otherwise use casino store -->
              {#if casinos.data.length > 0}
                {#each casinos.data as casino, i (casino.id)}
                  <tr
                    class="flex flex-wrap md:table-row border-[12px] border-casino-table-tr-border bg-white"
                  >
                    <td
                      class="casino-logo w-1/2 md:w-auto relative overflow-hidden md:w-[210px] md:max-w-[210px]"
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
                            imageWidth={206}
                            imageHeight={88}
                          />
                        </Link>
                      </div>
                    </td>
                    <td
                      class="w-full md:w-auto bg-gradient-to-r from-no-deposit-gradient/20 via-white/30 via-[percentage:30%_70%] to-no-deposit-gradient/20"
                    >
                      <div
                        class="flex flex-col items-center justify-center h-full px-3 py-3"
                      >
                        <div class="flex ml-5 font-bold">
                            <Link
                              externalInNewTab={true}
                              class="text-decoration-underline text-blue-300"
                              href={`${casino?.attributes?.casinoBonus?.bonusUrl}`}
                            >
                              {casino?.attributes?.casinoBonus?.bonusLabel}
                            </Link>
                          </div>
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
              {/if}
            </tbody>
    </table>
</div>


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
								box-shadow: 0px 0px 4px #ffbd3b, 0px 1px 6px rgba(16, 24, 40, 0.1);
							}
						}
                        .casino-logo__second {
							:global(a) {
								background: linear-gradient(to bottom, #dbe5ef, #b1bbc6);
							}
							.casino-logo__tag {
								background: linear-gradient(to bottom, #dbe5ef, #b1bbc6);
								box-shadow: 0px 0px 4px #d7e1eb, 0px 1px 6px rgba(16, 24, 40, 0.1);
							}
						}
						.casino-logo__third {
							:global(a) {
								background: linear-gradient(to bottom, #de7d45, #9b4e22);
							}
							.casino-logo__tag {
								background: linear-gradient(to bottom, #de7d45, #9b4e22);
								box-shadow: 0px 0px 4px #d77842, 0px 1px 6px rgba(16, 24, 40, 0.1);
							}
						}
                    }
                }
            }
        }
    }
</style>