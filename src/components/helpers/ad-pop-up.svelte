<script lang="ts">

  import dayjs from "dayjs";
  import { adPopup } from "../../../stores/ad-popup";
  import Images from './images.svelte';
  import AdCasinoListBlock from "../../components/blocks/adCasinoListBlock.svelte";

  import Xmark from "~icons/kensho-icons/xmark";

  export let data: any;
  export let translationStore;

  let today:string;
  let hasPopupExpired:boolean = true;
  let showAdPopup:boolean;

  let frequencyType = {
    Daily: 1,
    Weekly: 7
  };

  let minutesToShow = (data?.minutesToShow * 60) * 1000; //get minutes to show in milliseconds


  let frequencyValue = (data?.activate) ? frequencyType[data?.frequency] : null;

  const saveNextPopup = () => {
    if(data?.activate) {
      let expiryDate = dayjs().add(frequencyValue, 'day').format('YYYY-MM-DD');
      adPopup.set({status:true, expiryDate}); 
    }
  };

  $: {
    setTimeout(() => {
      today = dayjs().format("YYYY-MM-DD");
      hasPopupExpired = dayjs($adPopup.expiryDate).isAfter(dayjs(today));
    }, minutesToShow);
  }
  
  
</script>

{#if !hasPopupExpired}
 <div
      class="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="ad-modal-anchor"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity bg-primary opacity-100"
        aria-hidden="true"
      />

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative flex flex-col justify-center items-center transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full  md:w-[700px] sm:p-6">
            <div
                on:click={saveNextPopup}  
                class="border border-[#dadada] shadow-md hover:drop-shadow-lg close-btn rounded-full w-[50px] h-[50px] text-white flex items-center justify-center bg-white cursor-pointer absolute top-[-20px] right-[-10px] z-50">
              <Xmark
                width="35px"
                height="35px"
                class="text-black"
              />
            </div>
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {data?.title}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{data?.description}</p>
                </div>
                <div class="mt-2">
                  <AdCasinoListBlock
                    data={data.casinos}
                    {translationStore}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 {/if}