<script lang="ts">
  import { onMount } from "svelte";
  import { user, readMessages, messages, slotMachineUrl } from "../../../stores/authStore";
  //   Icons
  import UserPlaceholderSvg from "~icons/kensho-dashboard-icons/user-placeholder";
  import SignoutSvg from "~icons/kensho-dashboard-icons/signout";
  import type { TranslationData } from "../../../interfaces/common/types";
  import DashboardNav from "./dashboardNav.svelte";

  let activeRoute = "home";
  export let translations: TranslationData;
  export let pageUrl: string;
  export let slotMachineURL: string;

  const fetchData = async (endpoint: string) => {
		const res = await fetch(`${endpoint}`)
		if (!res.ok) {
			// throw error(res.status, { message: res.statusText })
		}
		const response = await res.json()
		return response
	}

  onMount(async () => {
    slotMachineUrl.set(slotMachineURL);
    const authEndpoints = [
		`${import.meta.env.BASE_URL}api/dashboard/user/`,
		`${import.meta.env.BASE_URL}api/dashboard/messages/`,
		`${import.meta.env.BASE_URL}api/dashboard/message-action/`
	]
	const [
		userProfile,
		userMessages,
		userMessageActions
	] = await Promise.all(authEndpoints.map((endpoint) => fetchData(endpoint)))
    const readMessagesStr = userMessageActions.id ? userMessageActions.read_messages : '';
	  const readMessageList = readMessagesStr ? JSON.parse(readMessagesStr) : [];

    user.set({ ...userProfile });
    readMessages.set(readMessageList)
    messages.set(userMessages)

  });

  const logoutHandler = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}api/auth/logout/`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    location.reload();
    user.set(null);
  };
</script>

<aside
  class="sticky top-[99px] z-30 hidden w-[320px] h-[calc(100vh_-_99px)] shrink-0 py-8 bg-dash-menu-nav-bg px-4 -my-10 lg:block"
>
  <nav class="flex flex-1 flex-col h-full justify-between">
    <DashboardNav translations={translations} pageUrl={pageUrl} source={'SIDE'} />

    <div
      class="sticky bottom-0 py-8 -mb-8 bg-dash-menu-nav-bg border-t border-t-white -mx-4 px-8"
    >
      <div
        class="flex gap-x-4 justify-between items-center cursor-pointer"
        on:click={logoutHandler}
      >
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
        <SignoutSvg class="shrink-0 w-[18px] text-blue-100" />
      </div>
    </div>
  </nav>
</aside>
