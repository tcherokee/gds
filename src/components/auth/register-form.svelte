<script lang="ts">
  import { onMount } from "svelte";
  import { getTranslations } from "../../../stores/addTranslations";

  let firstName: string = "";
  let lastName: string = "";
  let email: string = "";
  let username: string = "";
  let password: string = "";
  let newsletter = false;
  let isRegistrationSuccessfull = false;
  let registrationLoader = false;
  let recaptchaToken = "";

  const validateRegistrationForm = () => {
    if (!firstName || !lastName || !email || !username || !password) {
      alert("All fields are required!");
    } else {
      window.grecaptcha.execute();
    }
  };

  const registrationHandler = async () => {
    registrationLoader = true;
    const loginPayload = {
      lastName,
      firstName,
      email,
      username,
      password,
      newsletter,
      recaptchaToken,
    };
    const response = await fetch(
      `/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(loginPayload),
      }
    );
    const res = await response.json();
    resetCaptcha();
    registrationLoader = false;
    if (res?.error) {
      //   toast.error(res?.error.message);
    } else {
      isRegistrationSuccessfull = true;
    }
  };

  const handleCaptchaError = () => {
    error = $getTranslations.recaptchaError;
    recaptchaToken = "";
  };
  const resetCaptcha = () => {
    window.grecaptcha.reset();
    recaptchaToken = "";
  };

  const handleCaptchaCallback = async (token: string) => {
    recaptchaToken = token;
    registrationHandler();
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
          reject($getTranslations.loadRecaptchaError);
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

<div
  class="auth-bg flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div
    class="auth-form-container p-10 rounded-xl w-full max-w-[440px] space-y-6"
  >
    {#if !isRegistrationSuccessfull}
      <div class="space-y-3">
        <h2 class="text-blue-700 text-[32px] font-bold leading-[38px]">
          {$getTranslations.signUp}
        </h2>
        <p class="text-base text-blue-500">
          {$getTranslations.registrationPageSubtitle}
        </p>
      </div>
      <form class="space-y-5" action="#" method="POST">
        <div>
          <label
            for="firstName"
            class="block text-blue-500 text-sm font-medium mb-[6px]"
            >{$getTranslations.firstName}</label
          >
          <div class="mt-2">
            <input
              class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
              id="firstName"
              name="firstName"
              type="text"
              bind:value={firstName}
              placeholder={$getTranslations.enterFirstName}
              required
            />
          </div>
        </div>

        <div>
          <label
            for="lastName"
            class="block text-blue-500 text-sm font-medium mb-[6px]"
            >{$getTranslations.lastName}</label
          >
          <div class="mt-2">
            <input
              class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
              id="lastName"
              name="lastName"
              type="text"
              bind:value={lastName}
              placeholder={$getTranslations.enterLastName}
              required
            />
          </div>
        </div>
        <div>
          <label
            for="email-address"
            class="block text-blue-500 text-sm font-medium mb-[6px]"
            >{$getTranslations.email}</label
          >
          <input
            id="email-address"
            class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
            name="email"
            type="email"
            autocomplete="email"
            bind:value={email}
            placeholder={$getTranslations.enterEmail}
            required
          />
        </div>

        <div>
          <label for="username" class="block text-sm font-medium leading-6"
            >{$getTranslations.username}</label
          >
          <div class="mt-2">
            <input
              class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
              id="username"
              name="username"
              type="text"
              bind:value={username}
              placeholder={$getTranslations.enterUsername}
              required
            />
          </div>
        </div>

        <div class="mt-4">
          <label for="password" class="block text-sm font-medium leading-6"
            >{$getTranslations.password}</label
          >
          <div class="mt-2">
            <input
              class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-[rgba(255,255,255,0.30)] focus:border-misc focus:shadow-none"
              id="password"
              name="password"
              type="password"
              bind:value={password}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div
          class="g-recaptcha"
          data-sitekey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
          data-callback="handleCaptchaCallback"
          data-expired-callback="resetCaptcha"
          data-error-callback="handleCaptchaError"
          data-size="invisible"
        />

        <div class="flex items-center">
          <input
            id="newsletter-checkbox"
            name="newsletterCheckbox"
            type="checkbox"
            class="h-4 w-4 rounded border-grey-300 text-primary focus:ring-primary/90"
            bind:checked={newsletter}
          />
          <label for="remember-me" class="ml-3 block text-sm text-blue-500"
            >{$getTranslations.subscribeNewsletter}</label
          >
        </div>

        <div>
          <button
            type="button"
            class="register-btn flex w-full justify-center items-center px-3 py-[7px]"
            on:click={validateRegistrationForm}
          >
            {#if registrationLoader}
              <span class="custom-spinner mr-2" aria-hidden="true" />
            {/if}
            <span
              >{registrationLoader
                ? $getTranslations.pleaseWait
                : $getTranslations.signUp}</span
            >
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-blue-500 !mb-2">
          {$getTranslations.checkSpamMessage}
        </p>
        <p class="text-center text-base text-blue-500 !mb-0">
          {$getTranslations.haveAccount}
          <a
            href={"/authentication/login"}
            class="-m-3 font-bold rounded-md p-3 transition duration-150 ease-in-out text-misc hover:text-misc/90"
          >
            {$getTranslations.logIn}
        </a>
        </p>
      </div>
    {:else}
      <div class="flex flex-col items-center space-y-2">
        <h2 class="text-blue-700 text-[32px] font-bold leading-[38px]">
          {$getTranslations.registrationSuccessful}
        </h2>
        <p class="text-base text-blue-500">
          {$getTranslations.confirmationEmailDesc}
          <span class="text-misc font-bold">{email}</span>.
        </p>
        <p class="text-sm text-blue-500">{$getTranslations.checkSpamMessage}.</p>
        <a
          href={"/authentication/login"}
          class="block text-base text-center min-h-[44px] rounded-md btn-secondary px-3 py-2.5 text-sm font-semibold"
        >
          {$getTranslations.backToSignIn}
      </a>
      </div>
    {/if}
  </div>
</div>
