<script lang="ts">
	export let data: any
	import TransformImage from '../helpers/images.svelte'

	let slideImages = new Array()
	let imageArray = data?.image?.data
	let imageArrayCount = imageArray?.length
	let currentSlideIndex: any = 0
	let imagePerSlide = 2

	for (let i = 0; i < imageArrayCount; i += imagePerSlide) {
		const chunk = data?.image?.data.slice(i, i + imagePerSlide)
		slideImages.push(chunk)
	}

	let slideNavigation = (direction: string, isMobile: boolean) => {
		let carouselImages = isMobile ? imageArray : slideImages

		if (direction === 'next') {
			carouselImages.length > currentSlideIndex + 1
				? (currentSlideIndex += 1)
				: (currentSlideIndex = 0)
		} else {
			currentSlideIndex > 0
				? (currentSlideIndex -= 1)
				: (currentSlideIndex = carouselImages.length - 1)
		}
	}
</script>

{#if imageArray}
	{#if data?.carouselTitle != null}
		<h2 class="mb-4">{data?.carouselTitle}</h2>
	{/if}
	<div class="bg-white p-1 rounded-lg my-5">
		<div class="carousel w-full relative overflow-x-hidden">
			{#each slideImages as slideImg, index}
				<div
					id={'item' + (index + 1)}
					class={'carousel-item w-full ' + (currentSlideIndex === index ? 'silideIn' : 'hidden')}
				>
					<div class="grid gap-2 grid-cols-2">
						{#each slideImg as img}
							<div class="relative h-full w-full">
								<TransformImage
									imageUrl={img?.attributes?.url}
									imageWidth={700}
									imageHeight={350}
									imageClass="img-fluid w-full rounded-lg"
									imageAlt={img?.attributes?.alternativeText}
								/>
								{#if img?.attributes?.alternativeText != null}
									<div class="image-info line-clamp-1 hidden md:block">
										{img?.attributes?.alternativeText}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
			<div class="absolute flex justify-between transform -translate-y-1/2 top-1/2 w-full">
				<div
					class="p-3 flex items-center opacity-70 cursor-pointer bg-black text-white"
					on:click={() => slideNavigation('previous', false)}
				>
					❮
				</div>
				<div
					class="p-3 flex items-center opacity-70 cursor-pointer bg-black text-white"
					on:click={() => slideNavigation('next', false)}
				>
					❯
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.image-info {
		@apply absolute bottom-0 w-full text-white p-2 rounded-b-lg bg-[linear-gradient(180deg,rgba(47,18,58,0)_0%,rgba(0,0,0,0.7)_37.79%)];
		text-shadow: 0px 0px 12px rgb(63, 230, 252);
		backdrop-filter: blur(6px);
	}
	.silideIn {
		position: relative;
		animation-name: slideIn;
		animation-duration: 2s;
	}

	@keyframes slideIn {
		0% {
			left: 500px;
		}
		25% {
			left: 0px;
		}
		50% {
			left: 0px;
		}
		75% {
			left: 0px;
		}
		100% {
			left: 0px;
		}
	}
</style>
