<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../../stores/authStore";
  import { toast } from "svoast";

  // Components
  import Link from "../helpers/link.svelte";

  export let translations: { [key: string]: string };
  let email: string = "";
  let password: string = "";
  let logInLoader = false;
  // Recaptcha
  let error = "";
  let recaptchaToken = "";

  const validateLoginForm = () => {
    if (!email || !password) {
      alert(translations.emailPassReq);
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
    const response = await fetch(`${import.meta.env.BASE_URL}api/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginPayload),
    });
    logInLoader = false;
    const res = await response.json();
    resetCaptcha();
    if (res.jwt) {
      const { firstName, lastName, username, email, bio, cover_image, photo } =
        res.user;
      user.set({
        firstName,
        lastName,
        username,
        email,
        bio,
        cover_image,
        photo,
      });
      // window.localStorage.setItem(
      //   "_user",
      //   JSON.stringify({
      //     firstName,
      //     lastName,
      //     username,
      //     email,
      //     bio,
      //     cover_image,
      //     photo,
      //   })
      // );
      location.reload();
      // user.set({ firstName, lastName, username, email, bio, cover_image, photo })
    } else {
      toast.error(res?.error.message)
    }
  };

  const handleCaptchaError = () => {
    error = translations.recaptchaError;
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
          reject(translations.loadRecaptchaError);
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
      >{translations.email}</label
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
    <label
      for="password"
      class="block text-blue-500 text-sm font-medium mb-[6px]"
      >{translations.password}</label
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
        >{translations.remember30}</label
      >
    </div>

    <div>
      <Link
        href={"/authentication/forgot-password/"}
        classes="block text-base text-misc font-bold transition duration-150 ease-in-out hover:text-misc/90"
      >
        {translations.forgotPassword}
      </Link>
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
      <span>{logInLoader ? translations.signingIn : translations.logIn}</span>
    </button>
  </div>
</form>
