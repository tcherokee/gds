<script lang="ts">
  import type { TranslationData } from "../../../interfaces/common/types.ts";
  import { ratings } from "../../../stores/ratings";

  export let avgRating: number;
  export let ratingClasses: string;
  export let ratingCount = 0;
  export let itemId = "";
  export let ratingType: 'games' | 'casinos';
  export let translations: TranslationData;

  let starRating: HTMLInputElement;
  let disabled = false;
  let userRating = 0;
  let ratingValuePercent = `${(avgRating * 100) / 5}%`;
  
  $: {
    const isRated = $ratings.find(
      (elem) => elem.id === +itemId && elem.type === ratingType
    );
    
    if (isRated) {
      disabled = true;
      userRating = isRated.ratingValue;
      ratingValuePercent = `${(userRating * 100) / 5}%`;
    }
  }

  const ratingHandler = async () => {
    userRating = +starRating.value;
    starRating.disabled = true;

    const ratingVariables = {
      id: itemId,
      ratingValue: starRating.value+'',
      itemPath: ratingType,
    };

    try {
      const res = await fetch(
        `${import.meta.env.PUBLIC_FULL_URL}/api/ratings/?` +
          new URLSearchParams(ratingVariables),
        { method: "PUT" }
      );
      const resData = await res.json()

      if (res.status !== 200) {
        return;
      }

      ratingCount = resData.ratingCount;
      avgRating = resData.ratingAvg;
      ratings.set([
        ...ratings.get(),
        {
          type: ratingType,
          id: +itemId,
          ratingValue: +starRating.value,
        }
      ]);

    //   toast.success(ratingSuccess);
    } catch (err) {
    //   toast.error(ratingError);
      console.error(err);
    }
  };
</script>

<div class="container flex w-auto p-0 m-0">
  <div class={"ratings inline-flex " + ratingClasses + " relative p-0 m-0"}>
    <div class="stars relative h-6">
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
          width={ratingValuePercent}
          class="rating__value fill-rating-value-fill h-full"
          clip-path="url(#stars)"
        />
      </svg>
      <input
        type="range"
        class="absolute opacity-0 z-30 w-full left-0 top-0 bottom-0 h-full"
        min="1"
        max="5"
        id="range-{itemId}"
        {disabled}
        value={userRating ? userRating : avgRating}
        bind:this={starRating}
        on:change={ratingHandler}
      />
    </div>
    {#if ratingClasses === "flex-col"}
      <span
        class="flex items-center justify-center text-center rating-text text-[14px] mt-2"
      >
        <span class="font-bold uppercase">{avgRating}/5</span>&nbsp; {translations.from}
        {ratingCount}
        {translations.votes}
      </span>
    {:else}
      <span
        class="flex items-center justify-center text-center rating-text text-[14px] ml-1"
      >
        <span class="font-bold uppercase">{avgRating}/5</span>
      </span>
    {/if}
  </div>
</div>
