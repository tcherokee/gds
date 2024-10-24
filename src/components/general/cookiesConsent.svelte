<script lang="ts">
  import Link from "../helpers/link.svelte";
  import { cookies } from "../../../stores/cookies";

  export let headerText: string;
  export let description: string;
  export let link: string;
  export let linkText: string;
  const acceptCookiesHandler = () => {
    cookies.set(true);
  };
</script>

{#if !$cookies}
  <section class="!z-[1000] w-full fixed bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.25)] bottom-[0.1em] py-[0.325em] px-[0.6em] text-[0.8em] max-h-[calc(100%_-_6em)] overflow-auto">
    <div class="md:flex justify-center items-center">
      <div class="basis-[80%] text-center">
        <h3
          class="text-[11px] text-center !mt-0 font-semibold leading-[1.3] text-primary uppercase"
        >
          {headerText}
        </h3>
        <p class="text-[0.8em] leading-[1.15em] my-[5px] mx-0">
          {description}
        </p>
      </div>
      <div class="flex items-center justify-end">
        <Link href="/{link}" class="uppercase leading-[2.8em] mr-[1em] text-misc"
          >{linkText}</Link
        >
        <button
          class="inline-block justify-center text-center px-[0.75em] py-[calc(0.375em_-_1px)] rounded-[3px] shadow-none w-[8em] leading-[1.5] h-[2.25em] border-[1px] uppercase border-transparent text-white bg-primary"
          on:click={acceptCookiesHandler}>OK</button
        >
      </div>
    </div>
  </section>
{/if}
