<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { toast } from "svoast";
  import type { TranslationData } from "../../../interfaces/common/types";
  import type {
    TRatingCounts,
    TReviewResponse,
    TUserReview,
  } from "../../../interfaces/review";
  import { user } from "../../../stores/authStore";
  import ReadOnlyRatings from "../helpers/readOnlyRatings.svelte";
  import { ratings } from "../../../stores/ratings";

  export let reviewTypeSlug: string;
  export let reviewTypeName: string;
  export let reviewTypeId: number;
  export let reviewType: "GAME" | "CASINO";
  export let translations: TranslationData = {};

  let userReviews: TUserReview[] = [];
  let ratingCounts: TRatingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let ratingCountsPercentage: TRatingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let avgRating = 0;
  let totalReviews = 0;
  let userReview: string;
  let userRating = 0;
  let starRating: HTMLInputElement;
  let userReviewData;

  //   DOM Related
  let reviewModal: HTMLDialogElement;
  const showReviewModal = async () => {
    if (!$user) {
      await window.localStorage?.setItem("_reviewSourceType", reviewType);
      await window.localStorage?.setItem(
        "_reviewDialogDeets",
        JSON.stringify({
          slug: reviewTypeSlug,
          type: reviewType,
        })
      );
      window.location.href = `${import.meta.env.BASE_URL}authentication/login/?review=${reviewTypeSlug}`;
      return;
    }
    reviewModal?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeReviewModal = () => {
    userReview = "";
    reviewModal?.close();
    document.body.style.overflow = "";
  };

  const getUserReview = async () => {
    const reviewsUrl =
      reviewType === "GAME"
        ? `${import.meta.env.BASE_URL}api/games/user-game-review/${reviewTypeId}/`
        : `${import.meta.env.BASE_URL}api/casinos/user-casino-review/${reviewTypeId}/`;
    const response = await fetch(reviewsUrl);
    const res: { data: TUserReview } = await response.json();
    userReviewData = res.data;
  };

  const getReviews = async () => {
    const reviewsUrl =
      reviewType === "GAME"
        ? `${import.meta.env.BASE_URL}api/games/game-reviews/${reviewTypeId}/`
        : `${import.meta.env.BASE_URL}api/casinos/casino-reviews/${reviewTypeId}/`;
    const response = await fetch(reviewsUrl);
    const res: { data: TReviewResponse } = await response.json();

    userReviews = res.data.reviews;
    ratingCounts = res.data.ratingCounts;
    totalReviews = res.data.totalReviews;
    const totalRating = userReviews.reduce((accumulator, review) => {
      return accumulator + review.rating;
    }, 0);
    if (totalRating) {
      avgRating = totalRating / totalReviews;
    }

    ratingCountsPercentage = {
      1: totalReviews ? ((ratingCounts[1] ?? 0) / totalReviews) * 100 : 0,
      2: totalReviews ? ((ratingCounts[2] ?? 0) / totalReviews) * 100 : 0,
      3: totalReviews ? ((ratingCounts[3] ?? 0) / totalReviews) * 100 : 0,
      4: totalReviews ? ((ratingCounts[4] ?? 0) / totalReviews) * 100 : 0,
      5: totalReviews ? ((ratingCounts[5] ?? 0) / totalReviews) * 100 : 0,
    };
  };

  const ratingHandler = async () => {
    userRating = +starRating.value;
  };

  const createUserReview = async () => {
    const reviewsUrl =
      reviewType === "GAME"
        ? `${import.meta.env.PUBLIC_FULL_URL}/api/games/game-reviews/`
        : `${import.meta.env.PUBLIC_FULL_URL}/api/casinos/casino-reviews/`;
    const response = await fetch(reviewsUrl, {
      method: "POST",
      body: JSON.stringify({
        [reviewType === "GAME" ? "gameId" : "casinoId"]: reviewTypeId,
        rating: 4,
        review: userReview,
      }),
    });
    userReview = "";
    getUserReview();
    closeReviewModal();
    if (response.ok) {
      const res = await response.json();
      if (res.error) {
        toast.error(res?.error?.message);
      } else {
        toast.success(transitions.reviewSuccessMessage);
      }
    }
  };

  $: {
    handleUserRatingReactivity();
  }

  onMount(async () => {
    // Listen for Esc key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && reviewModal.open) {
        closeReviewModal();
      }
    });

    getUserReview();
    await getReviews();
    if (!userReviewData && $user) {
      handleReviewDialogDeets();
    }
    handleUserRatingReactivity();
    reviewModal = document.querySelector("#review-modal") as HTMLDialogElement;
  });

  const handleReviewDialogDeets = async () => {
    const reviewDialogDeets = JSON.parse(
      await window.localStorage?.getItem("_reviewDialogDeets")
    );
    if (reviewDialogDeets) {
      window.localStorage?.removeItem("_reviewDialogDeets");
      const { type, slug } = reviewDialogDeets;
      if (type && type === reviewType && slug && slug === reviewTypeSlug) {
        showReviewModal();
      }
    }
  };

  const handleUserRatingReactivity = () => {
    const ratings = [...$ratings];
    userRating =
      ratings.find(
        ({ id, type }) =>
          id === reviewTypeId && type === `${reviewType.toLocaleLowerCase()}s`
      )?.ratingValue ?? 0;
  };
</script>

<div class="bg-white rounded-lg p-3 my-6">
  <h2 class="text-2xl font-bold !mt-0">{translations.userReviews}</h2>
  <div
    class={`md:flex items-center gap-x-3 pb-6 mb-6 ${userReviews.length ? "border-b border-b-[#CCCCCC]" : ""}`}
  >
    <div class="md:w-1/3">
      <div class="space-y-2.5">
        <div>
          <div
            class="flex items-center justify-center"
            on:click={showReviewModal}
          >
            <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
            <ReadOnlyRatings
              {avgRating}
              ratingCount={totalReviews}
              showVotes={false}
              ratingClasses={"flex-row"}
            />
          </div>
          <p class="sr-only">{(totalReviews * 100) / 5} out of 5 stars</p>
        </div>
        <p class="text-sm !mb-0 text-center">
          {translations.basedOn}
          {totalReviews}
          {totalReviews > 1 ? translations.reviews : translations.review}
        </p>
      </div>
      {#if !userReviewData}
        <button
          class="open-review-modal mt-6 inline-flex w-full items-center justify-center rounded-md border border-[#d1d5db] bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-[#f9fafb] sm:w-auto lg:w-full"
          on:click={showReviewModal}>{translations.writeAReview}</button
        >
      {/if}
    </div>
    <div class="md:w-2/3">
      <div class="mt-6">
        <h3 class="sr-only">Review data</h3>

        <dl class="space-y-3">
          <div class="flex items-center text-sm">
            <dt class="flex flex-1 items-center">
              <p class="w-3 font-medium !mb-0">
                5<span class="sr-only"> star reviews</span>
              </p>
              <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-rating-value-fill"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div class="relative ml-3 flex-1">
                  <div
                    class="h-3 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]"
                  ></div>
                  <div
                    style="width: {ratingCountsPercentage[5]}%"
                    class="absolute inset-y-0 rounded-full bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              {ratingCountsPercentage[5]}%
            </dd>
          </div>
          <div class="flex items-center text-sm">
            <dt class="flex flex-1 items-center">
              <p class="w-3 font-medium !mb-0">
                4<span class="sr-only"> star reviews</span>
              </p>
              <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-rating-value-fill"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div class="relative ml-3 flex-1">
                  <div
                    class="h-3 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]"
                  ></div>
                  <div
                    style="width: {ratingCountsPercentage[4]}%"
                    class="absolute inset-y-0 rounded-full bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              {ratingCountsPercentage[4]}%
            </dd>
          </div>
          <div class="flex items-center text-sm">
            <dt class="flex flex-1 items-center">
              <p class="w-3 font-medium !mb-0">
                3<span class="sr-only"> star reviews</span>
              </p>
              <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-rating-value-fill"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div class="relative ml-3 flex-1">
                  <div
                    class="h-3 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]"
                  ></div>
                  <div
                    style="width: {ratingCountsPercentage[3]}%"
                    class="absolute inset-y-0 rounded-full bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              {ratingCountsPercentage[3]}%
            </dd>
          </div>
          <div class="flex items-center text-sm">
            <dt class="flex flex-1 items-center">
              <p class="w-3 font-medium !mb-0">
                2<span class="sr-only"> star reviews</span>
              </p>
              <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-rating-value-fill"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div class="relative ml-3 flex-1">
                  <div
                    class="h-3 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]"
                  ></div>
                  <div
                    style="width: {ratingCountsPercentage[2]}%"
                    class="absolute inset-y-0 rounded-full bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              {ratingCountsPercentage[2]}%
            </dd>
          </div>
          <div class="flex items-center text-sm">
            <dt class="flex flex-1 items-center">
              <p class="w-3 font-medium !mb-0">
                1<span class="sr-only"> star reviews</span>
              </p>
              <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-rating-value-fill"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div class="relative ml-3 flex-1">
                  <div
                    class="h-3 rounded-full border border-[#e5e7eb] bg-[#f3f4f6]"
                  ></div>
                  <div
                    style="width: {ratingCountsPercentage[1]}%"
                    class="absolute inset-y-0 rounded-full bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              {ratingCountsPercentage[1]}%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  <div class="">
    <h3 class="sr-only">Recent reviews</h3>

    <div class="flow-root">
      {#each userReviews as userReview, index}
        <div class="flex space-x-4 mb-4">
          <div class="flex-none">
            <img
              src={userReview.user.photo.url}
              alt=""
              class="h-10 w-10 rounded-full bg-gray-100"
            />
          </div>
          <div
            class={`flex-1 pb-4 ${index < userReviews.length - 1 ? "border-b border-[#CCCCCC]" : ""}`}
          >
            <h4 class="text-sm !text-blue-700 font-medium !my-0">
              {userReview.user.firstName + " " + userReview.user.lastName}
            </h4>
            <p class="text-xs !mb-0">
              <time datetime="2021-07-16"
                >{dayjs(userReview.createdAt).format("MMMM D, YYYY")}</time
              >
            </p>

            <div class="mt-4 flex items-center">
              <ReadOnlyRatings
                avgRating={userReview.rating}
                ratingCount={1}
                showVotes={false}
                ratingClasses={"flex-row"}
                starHeightClass={"h-4"}
              />
            </div>
            <p class="sr-only !mb-0">{userReview.rating} out of 5 stars</p>

            <div class="prose prose-sm mt-2.5 max-w-none">
              <p class="text-sm !mb-0">
                {userReview.review}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Review Modal -->
<dialog
  class="review-modal p-6 rounded-xl w-full max-w-[440px] space-y-6"
  id="review-modal"
>
  <h4 class="!my-0 !text-blue-700">{reviewTypeName}</h4>
  <div class="container flex w-auto p-0 m-0">
    <div class={"ratings inline-flex relative p-0 m-0"}>
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
            width={`${(userRating * 100) / 5}%`}
            class="rating__value fill-rating-value-fill h-full"
            clip-path="url(#stars)"
          />
        </svg>
        <input
          type="range"
          class="absolute opacity-0 z-30 w-full left-0 top-0 bottom-0 h-full"
          min="1"
          max="5"
          value={userRating}
          id="rate-{reviewTypeId}"
          bind:this={starRating}
          on:change={ratingHandler}
        />
      </div>
    </div>
  </div>
  <div class="mt-2">
    <textarea
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      rows="4"
      name="user-review"
      id="user-review"
      placeholder="Write a review"
      bind:value={userReview}
      required
    ></textarea>
  </div>
  <div class="bg-gray-50 sm:flex sm:flex-row-reverse">
    <button
      class="submit-review-btn inline-flex w-full justify-center rounded-md btn-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
      type="button"
      disabled={!(userReview && userRating) ? true : false}
      on:click={createUserReview}>Submit</button
    >
    <button
      type="button"
      class="close-review-modal mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      on:click={closeReviewModal}>Cancel</button
    >
  </div>
</dialog>

<style lang="scss">
  .review-modal {
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: #dce9f3;
    box-shadow: 0px 0px 12px 0px rgba(63, 230, 252, 0.6);
    &::backdrop {
      background: rgb(0 0 0 / 0.4);
    }
  }
  button {
    &.submit-review-btn[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
</style>
