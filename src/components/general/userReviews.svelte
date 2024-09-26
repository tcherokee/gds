<script lang="ts">
  import { onMount } from "svelte";

  const userReviews = [1, 2];

  //   DOM Related
  let reviewModal: HTMLDialogElement;
  const showReviewModal = () => {
    reviewModal?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeReviewModal = () => {
    reviewModal?.close();
    document.body.style.overflow = "";
  };

  onMount(() => {
    reviewModal = document.querySelector("#review-modal") as HTMLDialogElement;
    // Listen for Esc key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && reviewModal.open) {
        closeReviewModal();
      }
    });
  });
</script>

<div class="bg-white rounded-lg p-3 my-6">
  <h2 class="text-2xl font-bold !mt-0">User Reviews</h2>
  <div
    class="md:flex items-center gap-x-3 pb-6 mb-6 border-b border-b-[#CCCCCC]"
  >
    <div class="md:w-1/3">
      <div class="space-y-2.5">
        <div>
          <div class="flex items-center justify-center">
            <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
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
          </div>
          <p class="sr-only">4 out of 5 stars</p>
        </div>
        <p class="ml-2 text-sm !mb-0 text-center">Based on 1624 reviews</p>
      </div>
      <button
        class="open-review-modal mt-6 inline-flex w-full items-center justify-center rounded-md border border-[#d1d5db] bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-[#f9fafb] sm:w-auto lg:w-full"
        on:click={showReviewModal}>Write a review</button
      >
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
                    style="width: calc(1019 / 1624 * 100%)"
                    class="absolute inset-y-0 rounded-full border border-rating-value-fill bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              63%
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
                    style="width: calc(162 / 1624 * 100%)"
                    class="absolute inset-y-0 rounded-full border border-rating-value-fill bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              10%
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
                    style="width: calc(97 / 1624 * 100%)"
                    class="absolute inset-y-0 rounded-full border border-rating-value-fill bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              6%
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
                    style="width: calc(199 / 1624 * 100%)"
                    class="absolute inset-y-0 rounded-full border border-rating-value-fill bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              12%
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
                    style="width: calc(147 / 1624 * 100%)"
                    class="absolute inset-y-0 rounded-full border border-rating-value-fill bg-rating-value-fill"
                  ></div>
                </div>
              </div>
            </dt>
            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
              9%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  <div class="">
    <h3 class="sr-only">Recent reviews</h3>

    <div class="flow-root">
      {#each userReviews as userReview}
        <div class="flex space-x-4 mb-4">
          <div class="flex-none">
            <img
              src="https://giochigatsby.s3.eu-west-1.amazonaws.com/3_36ad84792c.png"
              alt=""
              class="h-10 w-10 rounded-full bg-gray-100"
            />
          </div>
          <div class="flex-1 pb-4 border-b border-[#CCCCCC]">
            <h4 class="text-sm font-medium !my-0">David Adekunle</h4>
            <p class="text-xs !mb-0">
              <time datetime="2021-07-16">July 16, 2021</time>
            </p>

            <div class="mt-4 flex items-center">
              <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
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
            </div>
            <p class="sr-only !mb-0">5 out of 5 stars</p>

            <div class="prose prose-sm mt-4 max-w-none">
              <p class="text-sm !mb-0">
                This icon pack is just what I need for my latest project.
                There's an icon for just about anything I could ever need. Love
                the playful look!
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<dialog
  class="review-modal p-6 rounded-xl w-full max-w-[440px] space-y-6"
  id="review-modal"
>
  <h4 class="!my-0">Supreme 777 Jackpots</h4>
  <div class="mt-2">
    <textarea
      rows="4"
      name="user-review"
      id="user-review"
      placeholder="Write a review"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    ></textarea>
  </div>
  <div class="bg-gray-50 sm:flex sm:flex-row-reverse">
    <button
      type="button"
      class="inline-flex w-full justify-center rounded-md btn-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
      >Submit</button
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
</style>
