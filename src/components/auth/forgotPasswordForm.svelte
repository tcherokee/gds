<script lang="ts">
  import { toast } from "svoast";
  import Link from "../helpers/link.svelte";
  
  let email: string = "";
  let isResetLinkSent = false;
  let loader = false;
  
  export let translations: {[key: string]: string}
  const forgotPasswordHandler = async () => {
    loader = true;
    const response = await fetch(`${import.meta.env.BASE_URL}api/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    loader = false;
    const res = await response.json();
    if (res.error) {
      toast.error(res?.error.message)
    } else {
      isResetLinkSent = true;
    }
  };
</script>

<div
  class="auth-bg flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div
    class="auth-form-container p-10 rounded-xl w-full max-w-[440px] space-y-6"
  >
    <div class="space-y-3">
      <h2 class="text-blue-700 text-[32px] font-bold leading-[38px]">
        {translations.recoverPassword}
      </h2>
      {#if isResetLinkSent}
        <p class="text-base text-blue-500">
          {translations.forgotEmailMessage}<span class="text-misc font-bold"
            >{email}</span
          >.
        </p>
      {:else}
        <p class="text-base text-blue-500">
          {translations.passwordRecoverySubtitle}
        </p>
      {/if}
    </div>
    {#if !isResetLinkSent}
      <form class="space-y-6">
        <div>
          <label
            for="email-address"
            class="block text-blue-500 text-sm font-medium mb-[6px]"
            >{translations.emailAddress}</label
          >
          <input
            id="email-address"
            class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
            name="email"
            type="email"
            autocomplete="email"
            bind:value={email}
            required
            placeholder={translations.enterEmail}
          />
        </div>

        <div>
          <button
            type="button"
            class="flex w-full justify-center items-center rounded-md btn-secondary px-3 py-2.5 text-sm font-semibold leading-6 text-white"
            on:click={forgotPasswordHandler}
          >
            {#if loader}
              <span class="custom-spinner mr-2" aria-hidden="true" />
            {/if}
            <span
              >{loader
                ? translations.pleaseWait
                : translations.sendRecoverLink}</span
            >
          </button>
        </div>
      </form>
    {/if}
    <div class="space-y-6">
      {#if isResetLinkSent}
        <Link
          href={"/authentication/login/"}
          classes="block text-base text-center min-h-[44px] rounded-md btn-secondary px-3 py-2.5 text-sm font-semibold"
        >
          {translations.backToSignIn}
        </Link>
      {/if}
      <p class="text-center text-base text-blue-500 !mb-0">
        {translations.noAccount}
        <Link
          href={"/authentication/register/"}
          classes="-m-3 font-bold rounded-md p-3 transition duration-150 ease-in-out text-misc hover:text-misc/90"
        >
          {translations.signUp}
        </Link>
      </p>
    </div>
  </div>
</div>
