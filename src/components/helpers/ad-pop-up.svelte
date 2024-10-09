<script lang="ts">
  import { adPopup } from "../../../stores/ad-popup";
  import Images from './images.svelte';

  export let data: any;

  const acceptPlus18Handler = () => {
    let currentDate =  `${new Date().toLocaleDateString()}`
    adPopup.set({status:true, statusDate: currentDate}); 
  };

  const checkIfPopupHasBeenShownToday = () => {
   let currentDay = `${new Date().toLocaleDateString()}`;
   
   if($adPopup.statusDate < currentDay) {
    adPopup.set({ status: false, statusDate: currentDay })
   }
  }

  checkIfPopupHasBeenShownToday();
</script>

{#if !$adPopup.status}
<div
  class="relative z-50"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
  id="modal-anchor"
>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity bg-primary opacity-100"
    aria-hidden="true"
  >
  </div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
      >
        <div>
          <div
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
          >
            <Images
              imageUrl={data?.image?.data?.attributes?.url}
              imageClass="rounded-lg w-full h-full"
              imageAlt={data?.title}
              imageWidth={100}
              imageHeight={100}
            />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              {data?.title}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {data?.message}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            on:click={acceptPlus18Handler}
            class="agree-btn btn-misc inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >{data?.buttonText}</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
 {/if}