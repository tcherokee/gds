<script lang="ts">
  // Helpers
  import Search from "../helpers/search.svelte";
  import Favourite from "../helpers/favourite.svelte";
  import Link from "../helpers/link.svelte";

  // Images
  import Xmark from "~icons/kensho-icons/xmark";
  import Angle from "~icons/kensho-icons/angle";
  import UserSignedIn from "~icons/kensho-icons/user-signed-in";
  import UserSignedOut from "~icons/kensho-icons/user-signed-out";

  //Types
  import type { MenuItem } from "../../../interfaces/menu.ts";

  // Stores
  import { user } from "../../../stores/authStore.ts";
  import { y } from "../../../stores/window.ts";
  import { onMount } from "svelte";

  let toggle: boolean;

  onMount(async () => {
    // Call the API route to get auth cookie
    const response = await fetch(`${import.meta.env.PUBLIC_FULL_URL}/api/get-auth-cookie/`);
    const { hasAuthCookkie } = await response.json();
    toggle = !$user;
  });

  import { Toasts } from "svoast";
  import type { TranslationData } from "../../../interfaces/common/types.ts";

  let mobileChecked = false;

  const uncheckInput = () => {
    mobileChecked = false;
  };

  export let mainNavigation: MenuItem[];
  export let countryCode: string;
  export let translationStore: TranslationData = {};

  const backToTop = () => {
    document.body.scrollIntoView();
  };
</script>

<svelte:window bind:scrollY={$y} />

<div class="relative visible z-40 flex items-center lg:hidden" id="burger-menu">
  <input type="checkbox" id="toggleMenu" bind:checked={mobileChecked} />
  <label
    for="toggleMenu"
    class="mobile-nav-btn relative inline-flex items-center justify-center rounded-md p-2.5"
  >
    <span />
  </label>
</div>

<!-- <Link
      href="/authentication/login/"
      classes="pt-2 mt-1 ml-16 px-2 pb-3 rounded-t"
    >
      {#if $user}
        <UserSignedIn height="32px" width="32px" class="fill-sign-in" />
      {:else}
        <UserSignedOut height="32px" width="32px" class="fill-sign-in" />
      {/if}
    </Link> -->

<div
  class="invisible relative z-[200] delay-500 open:delay-[0ms] open:visible"
  aria-labelledby="slide-over-title"
  role="dialog"
  aria-modal="true"
  {...mobileChecked ? { open: "" } : {}}
>
  <div class="fixed inset-0" />

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="pointer-events-none fixed inset-y-0 left-0 flex max-w-xs pr-10"
      >
        <div
          class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 -translate-x-full open:translate-x-0"
          open={mobileChecked ? "" : null}
        >
          <div
            class="flex h-full flex-col overflow-y-scroll bg-navbar-bkg py-6 shadow-xl"
          >
            <div class="px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2
                  class="text-lg font-medium text-navbar-text"
                  id="slide-over-title"
                >
                  Menu
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="rounded-md bg-navbar-bkg text-navbar-text hover:text-gray-500 focus:outline-none"
                    on:click={uncheckInput}
                  >
                    <span class="sr-only">Close panel</span>
                    <Xmark height="24px" width="24px" />
                  </button>
                </div>
              </div>
            </div>
            <div class="relative flex-1 px-4 sm:px-6">
              <div class="mt-5 flex flex-grow flex-col">
                <nav
                  class="flex-1 space-y-1 bg-navbar-bkg px-2"
                  aria-label="Sidebar"
                >
                  {#each mainNavigation as nav}
                    {#if nav?.attributes?.children?.data?.length > 0}
                      <div class="space-y-1 group">
                        <button
                          type="button"
                          class="bg-navbar-bkg text-navbar-text hover:bg-nav-hover-bkg w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-t focus:bg-nav-hover-bkg focus:outline-none"
                          aria-controls="sub-menu-{nav?.id}"
                          aria-expanded="false"
                        >
                          <span class="flex-1">{nav?.attributes?.title}</span>
                          <Angle
                            class="h-5 w-5 flex-none text-gray-400 fill-navbar-text rotate-180 group-hover:rotate-0"
                          />
                        </button>
                        <div
                          class="!mt-0 bg-nav-hover-bkg hidden rounded-b group-hover:block"
                          id="sub-menu-{nav?.id}"
                        >
                          {#each nav?.attributes?.children?.data as child}
                            <Link
                              href={`${child?.attributes?.url}/`}
                              classes="flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm font-medium text-navbar-text hover:bg-nav-hover-bkg"
                            >
                              {child?.attributes?.title.split(`-`)[0]}
                            </Link>
                          {/each}
                        </div>
                      </div>
                    {:else}
                      <Link
                        href={`${nav?.attributes?.url}/`}
                        classes="flex w-full items-center rounded-md py-2 pl-2 pr-2 text-sm font-medium text-navbar-text hover:bg-nav-hover-bkg"
                        >{nav?.attributes?.title}
                      </Link>
                    {/if}
                  {/each}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <div class="fav-search z-40 flex ml-auto lg:ml-0 align-items-center">
      <Favourite />
      <Search />
    </div> -->

<ul class="hidden flex items-center lg:gap-x-2 lg:flex">
  {#each mainNavigation as nav}
    <li class="relative group">
      {#if nav?.attributes?.children?.data?.length > 0}
        <button
          type="button"
          class="flex items-center gap-x-1 p-3 rounded-t text-sm text-navbar-text uppercase group-hover:bg-nav-hover-bkg"
          aria-expanded="false"
        >
          {nav?.attributes?.title}
          <Angle
            class="h-5 w-5 flex-none text-gray-400 fill-navbar-text rotate-180 group-hover:rotate-0"
          />
        </button>
      {:else}
        <Link
          href={`${nav?.attributes?.url}/`}
          classes="group flex w-full items-center uppercase rounded-md p-3 text-sm font-medium text-navbar-text hover:bg-nav-hover-bkg"
        >
          {nav?.attributes?.title}
        </Link>
      {/if}

      {#if nav?.attributes?.children?.data?.length > 0}
        <ul
          class="absolute top-full w-max z-40 overflow-hidden rounded-b rounded-tr invisible transition ease-out translate-y-1 duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:transition group-hover:ease-in group-hover:duration-150 group-hover:visible"
          style="display"
        >
          {#each nav?.attributes?.children?.data as child}
            <li class="relative grid gap-4 bg-nav-hover-bkg px-4 py-3">
              <Link
                href={`${child?.attributes?.url}/`}
                classes="-m-3 uppercase block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50 text-navbar-text"
              >
                {child?.attributes?.title.split(`-`)[0]}
              </Link>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>

<div
  class="fav-search z-40 flex ml-auto lg:ml-0 align-items-center"
  id="fav-search"
>
  <Favourite {translationStore} />
  <Link
    href="/authentication/login/"
    classes="absolute left-[70px] top-[5px] pt-2 mt-1 px-2 pb-3 rounded-t lg:relative lg:left-auto lg:top-auto z-0"
  >
    {#if !toggle}
      <UserSignedIn height="32px" width="32px" class="fill-sign-in" />
    {:else}
      <UserSignedOut height="32px" width="32px" class="fill-sign-in" />
    {/if}
  </Link>
  <Search {translationStore} />
</div>

<Toasts position="top-right" />
<button
  class="hidden w-12 h-12 fixed bottom-14 right-2.5 z-40 data-active:block"
  id="back-to-top"
  on:click={backToTop}
  data-ui={$y > 50 ? "active" : null}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="scroll-arrow"
    viewBox="0 0 512 512"
  >
    <path
      class="fill-scroll-up-arrow"
      d="M390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
    /><path
      class="fill-scroll-up-bkg"
      d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
    />
  </svg>
</button>

<style lang="postcss">
  #toggleMenu {
    display: none;

    ~ .mobile-nav-btn {
      position: fixed;
      width: 50px;
      height: 50px;
      background: theme("colors.navbar-bkg");
      border: none;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      span {
        position: absolute;
        left: 50%;
        display: block;
        height: 2px;
        width: 65%;
        background: white;
        transform: translateX(-50%);
        transition: background 1ms ease-in-out 350ms;

        &:before,
        &:after {
          content: "";
          position: absolute;
          display: block;
          height: 2px;
          width: 100%;
          background: white;
        }

        &:before {
          top: -8px;
          transition:
            transform 350ms ease-in-out,
            top 200ms ease-out 350ms;
        }

        &:after {
          bottom: -8px;
          transition:
            transform 350ms ease-in-out,
            bottom 200ms ease-out 350ms;
        }
      }
    }

    &:checked {
      ~ .mobile-nav-btn {
        span {
          background: transparent;

          &:before {
            top: 0;
            transform: rotate(45deg);
            transition:
              top 350ms ease-in-out,
              transform 200ms ease-out 350ms;
          }
          &:after {
            bottom: 0;
            transform: rotate(-45deg);
            transition:
              bottom 350ms ease-in-out,
              transform 200ms ease-out 350ms;
          }
        }
      }
    }
  }
</style>
