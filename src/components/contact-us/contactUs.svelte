<script lang="ts">
//   import UploadCloud2Svg from "$assets/icons/upload-cloud-2.svg";
  import type { TranslationData } from "../../../interfaces/common/types";

  export let translations: TranslationData;

  let responseMessage: string;
  const contactUsFormHandler = async(e: SubmitEvent) => {
    console.log(e);
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/contact-us", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    responseMessage = data.message;
    console.log(responseMessage);
  }
</script>

<div class="dashboard-bg -mb-5 py-10">
  <div class="w-full xl:container px-2">
    <div class="dashboard-glass-wrapper p-3">
      <div
        class="rounded-xl bg-white space-y-20 px-5 md:px-10 lg:px-20 py-20 shadow-[0px_0px_12px_0px_rgba(63,230,252,0.60)] backdrop-blur-[6px] border border-[rgba(255,255,255,0.30)]"
      >
        <!-- <div class="space-y-20 pb-20 border-b border-b-grey-300">
					<div class="text-center">
						<h1 class="text-xl text-blue-300 font-bold mb-3 text-">{translations.contactUs}</h1>
						<h2 class="text-3xl text-blue-900 font-bold mb-4 md:text-4xl">{translations.contactUsPageTitle}</h2>
						<p class="text-lg text-blue-700">{translations.contactUsPageSubtitle}</p>
					</div>
					<div class="space-y-8 grid-cols-2 md:grid md:space-y-0">
						<div class="space-y-4">
							<div
								class="w-12 h-12 flex justify-center items-center mx-auto rounded-full border-[8px] border-grey-100 bg-background-1"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
										stroke="url(#paint0_linear_2343_6966)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_2343_6966"
											x1="12"
											y1="4"
											x2="12"
											y2="20"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#163183" />
											<stop offset="1" stop-color="#070C3F" />
										</linearGradient>
									</defs>
								</svg>
							</div>
							<div class="text-center space-y-2">
								<h3 class="text-xl text-blue-900 font-bold">Email</h3>
								<p class="text-lg text-blue-700 m-0">{translations.contactUsPageEmailTitle}</p>
							</div>
							<a
								href="mailto:hi@untitledui.com"
								class="block text-blue-300 text-lg font-bold text-center">hi@untitledui.com</a
							>
						</div>
						<div class="space-y-4">
							<div
								class="w-12 h-12 flex justify-center items-center mx-auto rounded-full border-[8px] border-grey-100 bg-background-1"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
										stroke="url(#paint0_linear_2343_6968)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z"
										stroke="url(#paint1_linear_2343_6968)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_2343_6968"
											x1="12"
											y1="2"
											x2="12"
											y2="22"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#163183" />
											<stop offset="1" stop-color="#070C3F" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_2343_6968"
											x1="12"
											y1="2"
											x2="12"
											y2="22"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#163183" />
											<stop offset="1" stop-color="#070C3F" />
										</linearGradient>
									</defs>
								</svg>
							</div>
							<div class="text-center space-y-2">
								<h3 class="text-xl text-blue-900 font-bold">Office</h3>
								<p class="text-lg text-blue-700 m-0">Come say hello at our office HQ.</p>
							</div>
							<address class="block text-blue-300 text-lg font-bold text-center">
								100 Smith Street'Collingwood VIC 3066 AU
							</address>
						</div>
						<div class="space-y-4">
							<div
								class="w-12 h-12 flex justify-center items-center mx-auto rounded-full border-[8px] border-grey-100 bg-background-1"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
										stroke="url(#paint0_linear_2343_6970)"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_2343_6970"
											x1="12.2324"
											y1="2.55469"
											x2="12.2324"
											y2="21.1601"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#163183" />
											<stop offset="1" stop-color="#070C3F" />
										</linearGradient>
									</defs>
								</svg>
							</div>
							<div class="text-center space-y-2">
								<h3 class="text-xl text-blue-900 font-bold">Phone</h3>
								<p class="text-lg text-blue-700 m-0">Mon-Fri from 8am to 5pm.</p>
							</div>
							<a
								href="mailto:+1 (555) 000-0000"
								class="block text-blue-300 text-lg font-bold text-center">+1 (555) 000-0000</a
							>
						</div>
					</div>
				</div> -->

        <div class="max-w-[480px] mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl text-blue-900 font-bold mb-4">
              {translations.getInTouch}
            </h2>
            <p class="text-lg text-blue-700">
              {translations.getInTouchSubtitle}
            </p>
          </div>

          <form
            class="space-y-6"
            on:submit={contactUsFormHandler}
          >
            <div class="space-y-6 md:space-y-0 md:flex gap-x-6">
              <div class="md:w-1/2">
                <label
                  for="firstName"
                  class="block text-blue-500 text-sm font-medium mb-[6px]"
                  >{translations.firstName}</label
                >
                <div class="mt-2">
                  <input
                    class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={translations.firstName}
                    required
                  />
                </div>
              </div>
              <div class="md:w-1/2">
                <label
                  for="lastName"
                  class="block text-blue-500 text-sm font-medium mb-[6px]"
                  >{translations.lastName}</label
                >
                <div class="mt-2">
                  <input
                    class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={translations.lastName}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="">
              <label
                for="email"
                class="block text-blue-500 text-sm font-medium mb-[6px]"
                >Email</label
              >
              <div class="mt-2">
                <input
                  class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@mail.com"
                  required
                />
              </div>
            </div>
            <div class="">
              <label
                for="phoneNumber"
                class="block text-blue-500 text-sm font-medium mb-[6px]"
                >{translations.phoneNumber}</label
              >
              <div class="mt-2">
                <input
                  class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                  id="phoneNumber"
                  name="phone"
                  type="tel"
                  placeholder="+39 000 000000"
                  required
                />
              </div>
            </div>
            <div>
              <label
                for="message"
                class="block text-blue-500 text-sm font-medium mb-[6px]"
                >{translations.message}</label
              >
              <div class="mt-2">
                <textarea
                  class="w-full py-2.5 px-[14px] text-base text-[#000] rounded border border-background-700"
                  id="message"
                  name="message"
                  placeholder="{translations.leaveUsAMessage}..."
                  rows={5}
                />
              </div>
            </div>
            <div class="flex items-center">
              <input
                id="privacyPolicy"
                name="privacyPolicy"
                type="checkbox"
                class="h-4 w-4 rounded border-grey-300 text-primary focus:ring-primary/90"
              />
              <label
                for="privacyPolicy"
                class="ml-3 block text-sm text-grey-500"
                >{translations.contactUsFormPrivacy}
                <a href="/" class="underline">{translations.privacyPolicy}.</a
                ></label
              >
            </div>

            <div class="">
              <button
                type="submit"
                class="register-btn uppercase flex w-full justify-center items-center px-3 py-[7px]"
              >
                <span>{translations.sendMessage}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  h1,
  h2 {
    text-shadow: none;
    backdrop-filter: none;
  }
</style>
