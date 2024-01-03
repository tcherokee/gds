<script lang="ts">
    import { get } from 'svelte/store';
    import { getTranslations } from "../../../stores/addTranslations.ts"

    // Import Images
    import Heart from "~icons/kensho-icons/heart"
    import Xmark from "~icons/kensho-icons/xmark"

    const translationStore = get(getTranslations)

    let favsChecked: boolean = false

    const closeFavs = () => favsChecked = false

    console.log('translations', translationStore, $getTranslations, get(getTranslations))
</script>

<div class="favourites flex pointer pl-5 pr-2 mr-2">
    <input type="checkbox" id="toggleFavs" class="hidden" bind:checked={favsChecked} />
    <label for="toggleFavs" class="relative inline-flex items-center justify-center">
        <Heart height="35px" width="35px" class="fill-unfilled-favs"/>
    </label>
</div>

<div
	class="invisible relative z-40 delay-500 open:delay-[0ms] open:visible"
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
	open={favsChecked ? favsChecked : null}
>
	<div class="fixed inset-0" />

	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
				<div
					class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-full open:translate-x-0"
					open={favsChecked ? favsChecked : null}
				>
					<div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
						<div class="px-4 sm:px-6">
							<div class="flex items-start justify-between">
								<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
									{$getTranslations?.favorite}
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
							<!-- <svelte:component this={FavouriteGamesList} /> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>