<script lang="ts">
  import type { TranslationData } from "../../../interfaces/common/types.ts";

  export let avgRating: number;
  export let showVotes: boolean = true;
  export let ratingCount: number;
  export let ratingClasses: string = "flex-col";
  export let translations: TranslationData = {};
  export let starHeightClass = 'h-6' 
</script>

<div class="container flex w-auto p-0 m-0">
  <div class={"ratings inline-flex " + ratingClasses + " relative p-0 m-0"}>
    <div class="stars {starHeightClass}">
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
    {#if showVotes}
      {#if ratingClasses === "flex-col"}
        <span
          class="flex items-center justify-center text-center rating-text text-[14px] mt-2"
        >
          <span class="font-bold uppercase">{avgRating}/5</span>&nbsp; {translations?.from}
          {ratingCount}
          {translations?.votes}
        </span>
      {:else}
        <span
          class="flex items-center justify-center text-center rating-text text-[14px] ml-1"
        >
          <span class="font-bold uppercase">{avgRating}/5</span>
        </span>
      {/if}
    {/if}
  </div>
</div>
