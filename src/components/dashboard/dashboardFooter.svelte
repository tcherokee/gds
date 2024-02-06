<script lang="ts">
  import { user } from "../../../stores/authStore";
  import type { TranslationData } from "../../../interfaces/common/types";
  import DashboardNav from "./dashboardNav.svelte";

   import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
   import ArrowDownSvg from "~icons/kensho-dashboard-icons/arrow-down";

  export let translations: TranslationData;
  export let pageUrl: string;
  let isMenuVisible = false;

  const menuToggler = () => {
    isMenuVisible = !isMenuVisible;
  }

</script>

<footer class="fixed w-full bottom-0 z-30 md:hidden">

    <div class="bg-dash-menu-nav-bg overflow-hidden overflow-y-auto group {isMenuVisible ? 'menu-open' : ''}">
        <div class="px-5 py-4 flex justify-between items-center gap-x-3">
            <div class="flex items-center gap-x-3 w-[calc(100%_-_34px]">
              <div
                class="shrink-0 flex justify-center items-center w-10 h-10 rounded-full bg-purple-700 border-white border-[2px]"
              >
                {#if !$user?.photo}
                  <UserPlaceholderSvg class="w-[80%] h-[80%]" />
                {:else}
                  <img
                    class="w-full h-full object-cover rounded-full"
                    src={$user?.photo.url}
                    alt={$user?.firstName + " avatar"}
                  />
                {/if}
              </div>
              <div class="">
                <div class="text-sm text-white line-clamp-1 font-semibold">
                  {$user?.firstName}
                  {$user?.lastName}
                </div>
                <div class="text-sm line-clamp-1 text-blue-100">
                  {$user?.email}
                </div>
              </div>
            </div>
    
            <button class="flex items-center gap-x-2 text-blue-100" on:click={menuToggler}>
                <ArrowDownSvg class="h-6 transition-all rotate-180 group-[.menu-open]:rotate-0" />
                <span>Menu</span>
            </button>
        </div>
        <!-- {isMenuVisible ? 'block translate-y-0' : 'hidden translate-y-[290px]'} -->
        <div class="px-4">
            <div class="pb-4 pt-2 border-t border-t-white transition-all hidden group-[.menu-open]:block">
                <DashboardNav translations={translations} pageUrl={pageUrl} source={'FOOTER'} />
            </div>
        </div>
    </div>
</footer>