<script lang="ts">

	import { onMount } from 'svelte'
	import { CasinoLiveStats } from '../../../lib/liveStatsVariables'
	import { dgaLiveStats } from '../../../lib/casinoStatsLive'

	export let data: any;
	let casinoStats: any

	import Blackjack from '../casino/live-stats/blackjack.svelte'
	import SweetBonanza from '../casino/live-stats/sweetbonanza.svelte'
	import Megawheel from '../casino/live-stats/megawheel.svelte'

	$: CasinoLiveStats.set(casinoStats)

	let showCasinoLiveStats = data?.showLiveStats
	let liveStatsGame = data?.game
	let liveStatsCasionId = data?.casinoId
	let liveStatsTableId = data?.tableId
	

	onMount(() => {
		// check if this game can show live casino stats
		if (showCasinoLiveStats) {
			//connect to live stats api
			casinoStats = dgaLiveStats.connect(
				'dga.pragmaticplaylive.net',
				liveStatsCasionId,
				liveStatsTableId
			)
			
		}
	})
	
	//live game casino stats components
	const GameTypes: any = {
		'blackjack': Blackjack,
		'sweetbonanza': SweetBonanza,
		'megawheel': Megawheel,
	}
</script>

<!-- Game casino live stats -->
{#if showCasinoLiveStats}
<div class="mb-5">
	<svelte:component this={GameTypes[liveStatsGame]} />
	<!-- {#if liveStatsGame === 'blackjack'}
		<Blackjack />
	{/if}

	{#if liveStatsGame === 'sweetbonanza'}
		<SweetBonanza />
	{/if}

	{#if liveStatsGame === 'megawheel'}
		<Megawheel />
	{/if} -->
</div>
{/if}
<!-- End Game casino live stats -->