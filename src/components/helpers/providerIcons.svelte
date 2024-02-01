<script lang="ts">
	export let providers
	export let numOfProviders = 7
	export let isFlatData = false

	import useTransformImage from '../../../lib/hooks/useTransformImage'
	import Images from './images.svelte';

	// const transformedImages = providers.map(provider => useTransformImage(provider.attributes?.images?.data?.attributes?.url, 40, 25, provider.attributes?.title)).join('')

	let items:any[] = []
	let popUpItems:any[] = []
	let transformedImages = ''

	if (providers.length > 8) {
		items = providers.slice(0, 7)
		popUpItems = providers.slice(7)
		transformedImages = popUpItems
			.map((provider) =>
				useTransformImage(
					isFlatData ? provider.images.url : provider?.attributes?.images?.data?.attributes?.url,
					45,
					28,
					isFlatData ? provider.title : provider.attributes?.title
				)
			)
			.join('')
	} else {
		items = providers
	}

	let hoverEl: any

	const showTooltip = (elementID: any) => {
		hoverEl = document.getElementById(elementID)
		hoverEl.classList.remove('hidden')
	}
	const hideTooltip = (elementID: any) => {
		hoverEl = document.getElementById(elementID)
		hoverEl.classList.add('hidden')
	}
</script>

<div class="provider-container">
	{#each items as provider}
		<Images
			imageUrl={isFlatData
				? provider?.images?.url
				: provider?.attributes?.images?.data?.attributes?.url}
			imageClass="provider-images"
			imageAlt={isFlatData ? provider?.title : provider.attributes?.title}
			imageWidth={50}
			imageHeight={35}
		/>
	{/each}
	{#if popUpItems.length > 0}
		<span
			class="more-providers cursor-pointer"
			data-bs-toggle="tooltip"
			data-bs-html="true"
			data-bs-title={transformedImages}
			on:mouseover={() => showTooltip('more-games')}
			on:focus={() => showTooltip('more-games')}
			on:mouseout={() => hideTooltip('more-games')}>+{popUpItems.length}</span
		>
		<div
			id="more-games"
			role="tooltip"
			class="hidden flex flex-wrap -mt-[190px] ml-[30px] text-black opacity-100 bg-grey-100 -mt-0 text-sm z-20 w-fit absolute transition duration-150 ease-in-out shadow-lg p-2 border border-grey-200 rounded"
		>
			{#each popUpItems as provider}
				<Images
					imageUrl={isFlatData
						? provider?.images?.url
						: provider?.attributes?.images?.data?.attributes?.url}
					imageClass="provider-images"
					imageAlt={isFlatData ? provider?.title : provider.attributes?.title}
					imageWidth={50}
					imageHeight={35}
				/>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.provider-container {
		display: flex;
		flex-wrap: wrap;

		:global(.provider-images) {
			border-radius: 4px;
			margin: 3px;
			border: 1px solid var(--bs-providers-img-border);
		}

		.more-providers {
			display: inline-flex;
			font-size: 14px;
			border: 1px solid #475059;
			background: #596775;
			color: white;
			border-radius: 4px;
			width: 50px;
			height: 35px;
			justify-content: center;
			align-items: center;
			margin: 3px;
		}
	}

	:global(.tooltip) {
		:global(img) {
			margin: 5px;
			border: 1px solid var(--bs-providers-img-border);
			border-radius: 4px;
		}
	}
</style>
