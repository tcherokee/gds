<script lang="ts">
    import { getTranslations } from "../../../stores/addTranslations.ts"

    export let avgRating: number
    export let showVotes: boolean
    export let ratingClasses: string
</script>

<div class="container flex  w-auto p-0 m-0">
	<div class={"ratings inline-flex "+ratingClasses+" relative p-0 m-0"}>
		<div class="stars h-6">
			<svg viewBox="0 0 1000 200" class="rating inline-flex h-full">
				<defs>
					<polygon
						id="star"
						points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "
					/>
					<clipPath id="stars">
						<use xlink:href="#star" />
						<use xlink:href="#star" x="20%" />
						<use xlink:href="#star" x="40%" />
						<use xlink:href="#star" x="60%" />
						<use xlink:href="#star" x="80%" />
					</clipPath>
				</defs>
				<rect
					class="rating__background fill-rating-fill stroke-rating-stroke w-full h-full stroke-1"
					clip-path="url(#stars)"
				/>

				<!-- Change the width of this rect to change the rating -->
				<rect
					width={(avgRating * 100) / 5 + "%"}
					class="rating__value fill-rating-value-fill h-full"
					clip-path="url(#stars)"
				/>
			</svg>
		</div>
		{#if  ratingClasses === 'flex-col'}
			<span class="flex items-center justify-center text-center rating-text text-[14px] mt-2">
				<span class="font-bold uppercase">{avgRating}/5</span>&nbsp; {$getTranslations.from} 5 {$getTranslations.votes}
			</span>
		{:else}
			<span class="flex items-center justify-center text-center rating-text text-[14px] ml-1">
				<span class="font-bold uppercase">{avgRating}/5</span>
			</span>
		{/if}
        
	</div>
</div>