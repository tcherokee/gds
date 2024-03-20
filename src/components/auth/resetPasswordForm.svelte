<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "svoast";

  // Components
  import Link from "../helpers/link.svelte";

  let code = "";
  let password = "";
  let passwordConfirmation = "";
  let loader = false;
  const publicUrl = `${import.meta.env.PUBLIC_FULL_URL}${import.meta.env.PUBLIC_SITE_ID === "gds" ? '/it' : ''}`;

  export let translations: { [key: string]: string };

  const resetPasswordHandler = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Password does not match.");
      return;
    }
    loader = true;
    const resetPasswordPayload = {
      code,
      password,
      passwordConfirmation,
    };
    const response = await fetch(`${publicUrl}/api/auth/reset-password/`, {
      method: "POST",
      body: JSON.stringify(resetPasswordPayload),
    });
    loader = false;
    const res = await response.json();
    if (res?.error) {
      toast.error(res?.error.message);
    } else {
      toast.success("Password reset successfully.");
      // goto((window.location = `${$page.url.origin}${base}/authentication/login`), {})
    }
  };

  onMount(async () => {
    // code = $page.url.searchParams.get('code') as string;
    if (!code) {
      // goto((window.location = `${$page.url.origin}${base}/authentication/login`), {})
    }
  });
</script>

<div
  class="auth-bg flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div
    class="auth-form-container p-10 rounded-xl w-full max-w-[440px] space-y-6"
  >
    <div class="space-y-3">
      <h2 class="text-blue-700 text-[32px] font-bold leading-[38px]">
        Reset Password
      </h2>
      <p class="text-base text-blue-500">
        {translations.resetPasswordSubtitle}
      </p>
    </div>
    <form class="space-y-4">
      <div>
        <label
          for="password"
          class="block text-blue-500 text-sm font-medium mb-[6px]"
          >Password</label
        >
        <input
          id="password"
          class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
          name="password"
          type="password"
          bind:value={password}
          required
          placeholder="••••••••"
        />
      </div>
      <div>
        <label
          for="password"
          class="block text-blue-500 text-sm font-medium mb-[6px]"
          >Confirm Password</label
        >
        <input
          id="confirm-password"
          class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
          name="confirmPassword"
          type="password"
          bind:value={passwordConfirmation}
          required
          placeholder="••••••••"
        />
      </div>

      <div>
        <button
          type="button"
          class="flex w-full justify-center items-center rounded-md btn-secondary px-3 py-2.5 text-sm font-semibold leading-6 text-white hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          on:click={resetPasswordHandler}
        >
          {#if loader}
            <span class="custom-spinner mr-2" aria-hidden="true" />
          {/if}
          <span>{loader ? "Please wait..." : "Reset Password"}</span>
        </button>
      </div>
    </form>

    <p class="text-center text-base text-blue-500 !mb-0">
      Go back to?
      <Link
        href={"/authentication/login/"}
        class="-m-3 font-bold rounded-md p-3 transition duration-150 ease-in-out text-misc hover:text-misc/90"
      >
        Login
      </Link>
    </p>
  </div>
</div>
