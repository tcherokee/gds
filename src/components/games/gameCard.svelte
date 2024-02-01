<script lang="ts">

    // First or Third Party Plugins
    import dayjs from 'dayjs'

    // Import Types
    import type { Game } from '../../../interfaces/games.ts'

    // Images
    import StarIcon from "~icons/kensho-icons/star-icon"

    // Helpers
    import { getTranslations } from "../../../stores/addTranslations.ts"
    import AddToFav from "../helpers/addToFavs.svelte"
    import { urlTranslate } from "../../../utils/data-store.util"
    import Image from "../helpers/images.svelte"

    export let game: Game

    let siteID = import.meta.env.PUBLIC_SITE_ID
    let gameURL = urlTranslate[siteID as keyof typeof urlTranslate]['game-pages']+"/"+game?.attributes?.slug;
    let provideURL = urlTranslate[siteID as keyof typeof urlTranslate]['casino-providers-page']+"/"+game?.attributes?.provider?.data?.attributes?.slug ?? game?.attributes?.provider?.slug;

</script>

<div class="relative cursor-pointer rounded-lg aspect-[235/244] w-full transition-shadow duration-[0.3s] sm:cursor-auto">
	<div class="absolute pointer-events-none h-full left-0 top-0 w-full">
		<Image
			imageUrl={game?.attributes?.images?.data?.attributes?.url ?? game?.attributes?.images?.url}
			imageAlt="{game?.attributes?.title} logo"
			imageWidth={235}
			imageHeight={244}
			imageClass="rounded-lg w-full h-full"
        />
	</div>
	<div class="game-meta pointer-events-none group py-0 rounded-lg flex flex-col justify-between h-full relative sm:pointer-events-auto z-10 sm:hover:bg-[linear-gradient(180deg,rgba(47,18,58,0)_0%,rgba(31,18,58,0.6)_37.79%)]">
		<div class={`${game?.attributes?.ratingAvg > 4.5
				? 'hot-slot'
				: dayjs().diff(game?.attributes?.publishedAt, 'day') <= 14
				? 'new-slot'
				: ''} text-[10px] leading-[16px] m-2 text-white font-bold w-fit px-[6px] pt-[1px] uppercase rounded-[40px] -tracking-[0.2px]`}>
			{game?.attributes?.ratingAvg > 4.5
				? 'hot slot'
				: dayjs().diff(game?.attributes?.publishedAt, 'day') <= 14
				? 'new slot'
				: ''}
		</div>
		<div class="transition-all duration-[0.3s] scale-75 flex flex-col items-center opacity-0 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 sm:group-hover:scale-100 sm:group-hover:opacity-100">
			<a href={gameURL} class="btn btn-secondary uppercase text-white w-[130px] mb-3">{$getTranslations.playFunBtn}</a>
			<a href={provideURL} class="btn btn-misc uppercase text-white w-[130px]">{$getTranslations.playRealBtn}</a>
		</div>
		<div class="game-title-container p-2 rounded-b-lg bg-[linear-gradient(180deg,rgba(47,18,58,0)_0%,rgba(31,18,58,0.6)_37.79%)]">
			<div
				class="flex justify-between items-center mb-[2px] transition-transform duration-[0.3s] translate-y-[20px] sm:group-hover:translate-y-0">
				<h4 class="text-white text-sm font-bold !m-0">
					<a href="/{game?.attributes?.slug}">
                        {game?.attributes?.title}
                    </a>
				</h4>
				<AddToFav game={game} classes="w-4 h-[14px]" />
			</div>
			<div class="flex items-center opacity-0 transition-all duration-[0.3s] sm:group-hover:opacity-100">
				<a href="/{game?.attributes?.slug}"
					class="text-[#CED4DA] text-xs">
					{game?.attributes?.provider?.data?.attributes?.title ?? game?.attributes?.provider?.title}&nbsp;•&nbsp;
				</a>
				<div class="w-[10px] h-[10px]">
					<StarIcon />
				</div>
				<div class="text-[10px] leading-[14px] text-[#CED4DA]">&nbsp;{game?.attributes?.ratingAvg}/5</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.game-meta {
		.hot-slot {
			background: linear-gradient(180deg, #ff7135 0%, #ff7c7c 0.01%, #ff2214 100%);
			box-shadow: 0px 2px 8px rgba(255, 91, 20, 0.4);
		}
		.new-slot {
			background: linear-gradient(180deg, #3fe6fc 0%, #00bcd4 100%);
			box-shadow: 0px 2px 8px rgba(0, 188, 212, 0.4);
		}
		.most-loved {
			background: linear-gradient(180deg, #cd7eff 0%, #ae41f3 100%);
			box-shadow: 0px 2px 8px rgba(175, 67, 244, 0.4);
		}
	}

	.is-fav {
		:global(path) {
			@apply fill-white;
		}
	}
</style>
