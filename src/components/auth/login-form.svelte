<script lang="ts">
  import { get } from "svelte/store";
  import { getTranslations } from "../../../stores/addTranslations";
  // import { user } from '$lib/stores/auth'
  // import { page } from '$app/stores'
  // import { base } from '$app/paths'
  import { onMount } from "svelte";
//   import { allTasks } from "nanostores";

//   // Set Nano Store to active state to start data loading
//   getTranslations.listen(() => { })

//   // Wait for nanostore to finish loading
//   await allTasks()

// // Get the now loaded translations and add them to the translation store variable
// const translationStore: TranslationData = get(getTranslations);
  let email: string = "";
  let password: string = "";
  let logInLoader = false;
  // Recaptcha
  let error = "";
  let recaptchaToken = "";
  const translationStore:any = get(getTranslations);
  console.log('TStore', translationStore)

  const validateLoginForm = () => {
    if (!email || !password) {
      alert(translationStore.emailPassReq);
    } else {
      window.grecaptcha.execute();
    }
  };

  const loginHandler = async () => {
    logInLoader = true;
    const loginPayload = {
      identifier: email,
      password,
      recaptchaToken,
    };
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginPayload),
    });
    logInLoader = false;
    const res = await response.json();
    console.log(res);
    resetCaptcha();
    if (res.jwt) {
      const { firstName, lastName, username, email, bio, cover_image, photo } =
        res.user;
      window.localStorage.setItem(
        "_user",
        JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          bio,
          cover_image,
          photo,
        })
      );
      location.reload();
      // user.set({ firstName, lastName, username, email, bio, cover_image, photo })
    } else {
      console.log(res?.error.message);
      // toast.error(res?.error.message)
    }
  };

  const handleCaptchaError = () => {
    error = translationStore.recaptchaError;
    recaptchaToken = "";
  };
  const resetCaptcha = () => {
    window.grecaptcha.reset();
    recaptchaToken = "";
  };

  const handleCaptchaCallback = async (token: string) => {
    recaptchaToken = token;
    loginHandler();
  };

  const initRecaptcha = (): Promise<any> => {
    const win = window as any;
    const grecaptcha = win.grecaptcha;
    if (grecaptcha) {
      return Promise.resolve(grecaptcha);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const grecaptcha = win.grecaptcha;
        if (grecaptcha) {
          resolve(grecaptcha);
        } else {
          reject(translationStore.loadRecaptchaError);
        }
      };
    });
  };

  onMount(() => {
    initRecaptcha().then((grecaptcha) => {});
    window.handleCaptchaCallback = handleCaptchaCallback;
    window.handleCaptchaError = handleCaptchaError;
    window.resetCaptcha = resetCaptcha;
  });
</script>

<form class="space-y-4 mt-6">
  <div>
    <label
      for="email-address"
      class="block text-blue-500 text-sm font-medium mb-[6px]"
      >{translationStore.test}</label
    >
    <input
      id="email-address"
      class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
      name="email"
      type="email"
      autocomplete="email"
      bind:value={email}
      required
      placeholder={translationStore.enterEmail}
    />
  </div>
  <div>
    <label
      for="password"
      class="block text-blue-500 text-sm font-medium mb-[6px]"
      >{translationStore.password}</label
    >
    <input
      id="password"
      class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
      name="password"
      type="password"
      autocomplete="current-password"
      bind:value={password}
      required
      placeholder="••••••••"
    />
  </div>
  <div
    id="recaptcha"
    class="g-recaptcha"
    data-sitekey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
    data-callback="handleCaptchaCallback"
    data-expired-callback="resetCaptcha"
    data-error-callback="handleCaptchaError"
    data-size="invisible"
  />

  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        class="h-4 w-4 rounded border-grey-300 text-primary focus:ring-primary/90"
      />
      <label for="remember-me" class="ml-3 block text-sm text-blue-500"
        >{translationStore.remember30}</label
      >
    </div>

    <div>
      <a
        href={"/authentication/forgot-password"}
        class="block text-base text-misc font-bold transition duration-150 ease-in-out hover:text-misc/90"
      >
        {translationStore.forgotPassword}
      </a>
    </div>
  </div>

  <div>
    <button
      type="button"
      class="flex w-full justify-center items-center rounded-md btn-secondary px-3 py-2.5 text-sm font-semibold text-white"
      on:click={validateLoginForm}
    >
      {#if logInLoader}
        <span class="custom-spinner mr-2" aria-hidden="true" />
      {/if}
      <span
        >{logInLoader
          ? translationStore.signingIn
          : translationStore.logIn}</span
      >
    </button>
  </div>
</form>
