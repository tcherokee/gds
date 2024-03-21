<script lang="ts">
  import { onMount } from "svelte";
  import type { TUserMessage } from "../../../interfaces/auth";
  import { messages, readMessages } from "../../../stores/authStore";
  import Loader from "../helpers/loader.svelte";
  import type { TranslationData } from "../../../interfaces/common/types";
  import Link from "../helpers/link.svelte";

  let selectedMessage: TUserMessage | null;
  let deleteMessageLoader: { [key: string]: boolean } = {};

  export let translations: TranslationData;

  let userMessages: TUserMessage[] = [];
  let userMessagesLoader = true;
  

  onMount(async () => {
    userMessagesLoader = true;
    const res = await fetch(`${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/messages/`);
    if (res.ok) {
      userMessages = await res.json();
    }
    userMessagesLoader = false;
  });

  const messageSelectionHandler = (message: any) => {
    readMessageHandler(message.id);
    selectedMessage = message;
  };

  const backBtnHandler = () => {
    selectedMessage = null;
  };

  const deleteMessageHandler = async (message: any) => {
    deleteMessageLoader[message.id] = true;
    const response = await fetch(`${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/message-action/`, {
      method: "POST",
      body: JSON.stringify({
        message_id: message.id,
        action: "DELETE",
      }),
    });
    const res = await response.json();
    const lastMessages = [...$messages];
    const messageIndex = lastMessages.findIndex(({ id }) => id === message.id);
    lastMessages.splice(messageIndex, 1);
    userMessages = [...lastMessages];
    messages.set([...lastMessages]);
    deleteMessageLoader[message.id] = false;
    if (selectedMessage) {
      backBtnHandler();
    }
  };

  const readMessageHandler = async (message_id: number) => {
    if (!$readMessages.includes(message_id)) {
      const response = await fetch(`${import.meta.env.PUBLIC_FULL_URL}/api/dashboard/message-action/`, {
        method: "POST",
        body: JSON.stringify({
          message_id,
          action: "READ",
        }),
      });
      const res = await response.json();
      readMessages.set([...$readMessages, message_id]);
    }
  };
</script>

<div class="">
  {#if !selectedMessage}
    <h1 class="text-xl text-white font-bold font-lato mb-[14px]">
      {translations.message}
    </h1>
  {:else}
    <div class="flex justify-between items-center gap-x-3 mb-[14px]">
      <button class="flex gap-x-3 items-center" on:click={backBtnHandler}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 8H1M1 8L8 15M1 8L8 1"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="text-xl text-white font-bold font-lato">
          Back to {translations.message}
        </div>
      </button>
      <button
        type="button"
        class="flex justify-center items-center uppercase rounded-md btn-secondary px-4 py-2.5 text-sm font-semibold text-white hidden md:block"
        disabled={deleteMessageLoader[selectedMessage?.id] ? true : false}
        on:click={deleteMessageHandler.bind(this, selectedMessage)}
      >
        {#if deleteMessageLoader[selectedMessage?.id]}
          <Loader />
        {/if}
        <span>{translations.delete}</span>
      </button>
    </div>
  {/if}
  {#if userMessagesLoader}
    <div class="py-10 flex justify-center">
      <Loader />
    </div>
  {:else}
    <div class="dashboard-glass-wrapper p-3">
      {#if userMessages.length}
        <div class="bg-white border border-blue-100 rounded-[6px] py-4 px-6">
          {#if !selectedMessage}
            <table>
              <tbody class="divide-y divide-grey-100">
                {#each userMessages as message}
                  <tr class="flex items-center cursor-pointer">
                    <td class="flex basis-[168px] shrink-0 pr-8">
                      <div
                        class="flex items-center gap-x-2.5"
                        on:click={messageSelectionHandler.bind(this, message)}
                      >
                        {#if !$readMessages.includes(message.id)}
                          <span class="w-2 h-2 rounded-full bg-[#4FD64C]" />
                        {/if}
                        <div
                          class="line-clamp-1 text-base text-black {!$readMessages.includes(
                            message.id
                          )
                            ? 'font-bold'
                            : ''}"
                        >
                          {message.title}
                        </div>
                      </div>
                    </td>
                    <td class="hidden flex-auto md:flex">
                      <div>
                        <span class="message-content line-clamp-1 text-base">
                          {@html message.content}
                        </span>
                      </div>
                    </td>
                    <td class="hidden whitespace-nowrap md:block">
                      <div class="shrink-0 flex gap-x-2.5">
                        <button
                          type="button"
                          class="flex w-fit justify-center items-center uppercase rounded-md btn btn-misc px-4 py-2.5 text-sm font-semibold text-white"
                          on:click={messageSelectionHandler.bind(this, message)}
                        >
                          {translations.readMessage}
                        </button>
                        <button
                          type="button"
                          class="flex w-[80px] justify-center items-center uppercase rounded-md btn-secondary px-4 py-2.5 text-sm font-semibold text-white"
                          disabled={deleteMessageLoader[message.id]
                            ? true
                            : false}
                          on:click={deleteMessageHandler.bind(this, message)}
                        >
                          {#if deleteMessageLoader[message.id]}
                            <Loader />
                          {/if}
                          <span>{translations.delete}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else}
            <h2 class="text-lg !font-bold">{selectedMessage.title}</h2>
            <div class="message-content">
              {@html selectedMessage.content}
            </div>
          {/if}
        </div>
      {:else}
        <div class="py-12 px-8">
          <div class="text-center text-base text-white">
            {translations.emptyUserMessages}
            <Link classes="text-misc underline" href="/contact-us/">
              {translations.contactUsHere}
            </Link>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  {#if selectedMessage}
    <button
      type="button"
      class="flex w-full justify-center items-center uppercase rounded-md btn-secondary mt-6 px-4 py-2.5 text-sm font-semibold text-white md:hidden"
      disabled={deleteMessageLoader[selectedMessage?.id] ? true : false}
      on:click={deleteMessageHandler.bind(this, selectedMessage)}
    >
      {#if deleteMessageLoader[selectedMessage?.id]}
        <Loader />
      {/if}
      <span>{translations.delete}</span>
    </button>
  {/if}
</div>

<style lang="scss">
  h1 {
    text-shadow: none;
  }
  table {
    td:last-child {
      border: none;
    }
    .message-content {
      :global(p) {
        @apply mb-0;
      }
    }
  }
  .message-content {
    :global(*) {
      font-size: 1rem !important;
    }
  }
</style>
