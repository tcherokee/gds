<script lang="ts">

	import type { GameAttributes } from "../../../interfaces/games"
    import { getTranslations } from '../../../stores/addTranslations';
	import  { favourite } from "../../../stores/favouriteStore"
	import TransformImage from "../helpers/images.svelte"
	import Link from "./link.svelte";

    // Import Images
    import Heart from "~icons/kensho-icons/heart"
    import Xmark from "~icons/kensho-icons/xmark"

    let favsChecked: boolean = false

    const closeFavs = () => favsChecked = false

	const removeFromFavs = (game: GameAttributes) => {
		 // If the game has been favourited, filter out the favourites excluding the favourite game
		const filterOutFav = $favourite.filter(fav => fav.title !== game?.title)

		//Set the favourites to the new array excluding the game which was previously favourited
		favourite.set(filterOutFav)
	}
</script>

<div class="favourites flex cursor-pointer pl-5 pr-2 mr-2">
    <input type="checkbox" id="toggleFavs" class="hidden" bind:checked={favsChecked} />
    <label for="toggleFavs" class="relative inline-flex items-center justify-center">
        <Heart height="35px" width="35px" class={$favourite.length > 0 ? "fill-filled-favs" : "fill-unfilled-favs"}/>
    </label>
</div>

<div
	class="invisible relative z-40 delay-500 open:delay-[0ms] open:visible"
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
	{...(favsChecked ? { open:'' } : {})}
>
	<div class="fixed inset-0" />

	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
				<div
					class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-full open:translate-x-0"
					{...(favsChecked ? { open:'' } : {})}
				>
					<div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
						<div class="px-4 sm:px-6">
							<div class="flex items-start justify-between">
								<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
									{$getTranslations.favorite}
								</h2>
								<div class="ml-3 flex h-7 items-center">
									<button
										type="button"
										class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										on:click={closeFavs}
									>
										<span class="sr-only">Close panel</span>
                                        <Xmark class="h-6 w-6" />
									</button>
								</div>
							</div>
						</div>
						<div class="relative mt-6 flex-1 px-4 sm:px-6">
							{#each $favourite as fav }
								<div class="col-span-1 flex rounded-md shadow-sm mb-2">
									<div
										class="flex justify-items-start overflow-hidden w-16 flex-shrink-0 items-center justify-center rounded-l-md border-grey-300 border-l border-t border-b"
									>
										<Link href="/slot-machines/{fav?.slug || ''}">
											<TransformImage
												imageUrl={fav?.images?.url || ''}
												imageAlt={fav?.title}
												imageWidth={65}
												imageHeight={60}
											/>
										</Link>
									</div>
									<div
										class="relative flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-grey-300 bg-white"
									>
										<Link href="/slot-machines/{fav?.slug || ''}">
											<div class="flex flex-1 flex-col truncate px-4 py-1 text-sm leading-tight">
												<div class="font-medium uppercase text-left text-xs">{fav?.title || ''}</div>
												{#if fav?.categories}
													<div class="text-left text-[8px] m-0 mt-px">
														<span class="uppercase mr-2">Categorie</span>
														{#each fav?.categories as category}
															<span class="mr-1">{category?.title}</span>
														{:else}
															''
														{/each}
													</div>
												{/if}
												<div class="text-left text-[8px] m-0 mt-px">
													<span class="uppercase mr-2">software</span>{fav?.provider?.title}
												</div>
												<div class="text-left text-[8px] m-0 mt-px">
													<span class="uppercase mr-2">rating</span>1/5
												</div>
											</div>
										</Link>
										<button class="absolute top-1 right-1" on:click={() => removeFromFavs(fav)}>
											<Xmark class="h-6 w-6" />
										</button>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>