<script lang="ts">
	import { CasinoLiveStats } from '../../../../lib/liveStatsVariables'

	import MegaWheel1 from '../../../icons/mega-wheel/mw-1.webp'
	import MegaWheel2 from '../../../icons/mega-wheel/mw-2.webp'
	import MegaWheel5 from '../../../icons/mega-wheel/mw-5.webp'
	import MegaWheel8 from '../../../icons/mega-wheel/mw-8.webp'
	import MegaWheel10 from '../../../icons/mega-wheel/mw-10.webp'
	import MegaWheel15 from '../../../icons/mega-wheel/mw-15.webp'
	import MegaWheel20 from '../../../icons/mega-wheel/mw-20.webp'
	import MegaWheel30 from '../../../icons/mega-wheel/mw-30.webp'
	import MegaWheel40 from '../../../icons/mega-wheel/mw-40.webp'

	// Svelte and third party imports
	import { getContext } from 'svelte'
	import dayjs from 'dayjs'
	import advancedFormat from 'dayjs/plugin/advancedFormat'
	import 'dayjs/locale/it'
	dayjs.extend(advancedFormat)


	//get translation context
	const translations: any = getContext('translations')

	let stats: any
	let totalResultCount: any
	//How many results to view. default should be 5
	let ResultViewCount = 5

	CasinoLiveStats.subscribe((data: any) => {
		stats = data
		totalResultCount = stats?.last20Results?.length
	})

	//load more casinos
	const loadMoreResult = () => {
		if (ResultViewCount < totalResultCount) {
			ResultViewCount = ResultViewCount + ResultViewCount
		}
	}

	const OutcomeImages: any = {
		'1': MegaWheel1,
		'2': MegaWheel2,
		'5': MegaWheel5,
		'8': MegaWheel8,
		'10': MegaWheel10,
		'15': MegaWheel15,
		'20': MegaWheel20,
		'30': MegaWheel30,
		'40': MegaWheel40
	}
</script>

{#if stats !== undefined}
	<div class="rounded-lg mt-10">
		<div class="rounded-t-lg flex gap-2 items-center mb-5">
			<span class="relative flex h-5 w-5 justify-center items-center">
				<span
					class="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"
				/>
				<span class="relative inline-flex rounded-full h-2 w-2 bg-danger" />
			</span>
			<div>
				<h3>{translations.liveStatistics}</h3>
			</div>
		</div>

		<div>
			<div class="table-wrapper bg-grey-100 rounded-[6px] overflow-hidden">
				<table class="w-full">
					<thead
						class="hidden border-l-[12px] border-r-[12px] border-l-purple-800 border-r-purple-800"
					>
						<tr>
							<th scope="col" class="px-3">{translations.statsTimeAt}</th>
							<th scope="col" class="px-3">{translations.statsResultRotate}</th>
							<th scope="col" class="px-3">{translations.statsSlotResult}</th>
							<th scope="col" class="px-3">{translations.winningMultiplier}</th>
						</tr>
					</thead>

					<tbody class="text-casino-table-text">
						{#each stats.last20Results as result, index}
							{#if index < ResultViewCount}
								<tr>
									<td class="casino-logo w-1/2 md:w-auto relative overflow-hidden">
										<div
											class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none"
										>
											{dayjs(stats.time).format('DD/MM h:ma')}
										</div>
									</td>
									<td class="text-center w-1/2 md:w-auto bg-[#eef4f9]">
										<div
											class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none"
										>
											<!-- {result.result} -->
											<img
												src={OutcomeImages[result.result]}
												class="w-[50px]"
												alt={result.result}
											/>
										</div>
									</td>
									<td class="w-full md:w-auto bg-white">
										<div
											class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none"
										>
											{result.slot}x
										</div>
									</td>
									<td class="w-full md:w-auto bg-white">
										<div
											class="px-3 py-3 flex h-full flex-col items-center justify-center bg-white rounded-tr-lg md:rounded-tr-none"
										>
											{result.multiplier}x
										</div>
									</td>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
				<div class="flex justify-end items-center m-3 text-10">
					<div class="mr-5 font-extrabold">
						{ResultViewCount} of {totalResultCount}
						{translations.statsResult}
					</div>
					<div>
						<button class="btn capitalize btn-secondary" on:click={loadMoreResult}>
							{translations.loadMoreResult}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.detail-box {
		@apply flex gap-2 items-center;
	}
	.detail-title {
		@apply text-xs;
	}

	.detail-value {
		@apply text-sm md:text-base font-bold;
	}

	.icon-box {
		@apply w-10 h-10 border-2 border-purple-900 rounded flex items-center justify-center;
	}

	.sugarbomb-true {
		@apply bg-success text-center font-bold;
	}

	.sugarbomb-false {
		@apply bg-danger text-center font-bold;
	}

	.table-wrapper {
		table {
			@apply overflow-hidden rounded-[6px] border-spacing-0 border-collapse;
			thead {
				@apply md:table-row-group;
				// @media (min-width: theme('screens.md')) {
				// 	display: table-row-group;
				// }
				tr {
					@apply border-b-[12px] border-b-grey-100;
					// border-bottom: 12px solid #eef4f9;
				}
			}
			th {
				@apply text-white text-base text-center bg-purple-800 font-bold capitalize py-[11px];
			}
			tbody {
				tr {
					@apply flex flex-wrap md:table-row border-[12px] border-grey-100 bg-white;
					td {
						// padding: 0 !important;
						@apply rounded-none md:rounded-lg overflow-hidden p-0 h-auto md:h-[75px] md:max-w-[256px] xl:min-w-[170px] first:bg-grey-100 last:bg-grey-100;
					}
					td.casino-logo {
						:global(a) {
							@apply border border-[transparent];
							// border: 4px solid transparent;
							// border-image-slice: 1;
						}
						.casino-logo__tag {
							@apply w-[28px] h-6 absolute flex justify-center items-center p-[2px] top-0 left-[18px] rounded-bl rounded-br;
						}

						.casino-logo__first {
							:global(a) {
								background: linear-gradient(to bottom, #ffd976, #ffbb38);
								// border-image-source: linear-gradient(to bottom, #ffd976, #ffbb38);
							}
							.casino-logo__tag {
								background: linear-gradient(to bottom, #ffd976, #ffbb38);
								box-shadow: 0px 0px 4px #ffbd3b, 0px 1px 6px rgba(16, 24, 40, 0.1);
							}
						}
						.casino-logo__second {
							:global(a) {
								// border-image-source: linear-gradient(to bottom, #dbe5ef, #b1bbc6);
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
								// border-image-source: linear-gradient(to bottom, #de7d45, #9b4e22);
							}
							.casino-logo__tag {
								background: linear-gradient(to bottom, #de7d45, #9b4e22);
								box-shadow: 0px 0px 4px #d77842, 0px 1px 6px rgba(16, 24, 40, 0.1);
							}
						}
					}
					td.sugarbomb-cell {
						@apply w-full bg-white relative overflow-hidden md:w-auto;
					}
					td.sugarbomb-cell-true {
						background: linear-gradient(
							90deg,
							#8bff3f5c 0%,
							#fcfeff 31.77%,
							#fcfeff 69.79%,
							#8bff3f5c 92.2%
						);
					}

					td.sugarbomb-cell-false {
						background: linear-gradient(
							90deg,
							#ef444461 0%,
							#fcfeff 31.77%,
							#fcfeff 69.79%,
							#ef444461 92.2%
						);
					}
				}
			}
		}
		.exclusive-badge {
			background: linear-gradient(180deg, #7669f2 0%, #3e0497 100%);
			box-shadow: 0px 10px 15px -3px rgba(16, 24, 40, 0.1), 0px 4px 6px -4px rgba(16, 24, 40, 0.1);
		}
		.new-casino-badge {
			background: linear-gradient(180deg, #ff7135 0%, #ff7c7c 0.01%, #ff2214 100%),
				linear-gradient(180deg, #7669f2 0%, #3e0497 100%);
			box-shadow: 0px 10px 15px -3px rgba(16, 24, 40, 0.1), 0px 4px 6px -4px rgba(16, 24, 40, 0.1);
		}
	}
</style>
