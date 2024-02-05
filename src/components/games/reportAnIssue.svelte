<script lang="ts">
	import { urlTranslate } from '../../../utils/data-store.util'
    import { getTranslations } from '../../../stores/addTranslations';
	import { createEventDispatcher } from 'svelte'

	import Close from "~icons/kensho-icons/xmark"

	export let gameSlug: any

    const siteID = import.meta.env.PUBLIC_SITE_ID;
    const publicURL = import.meta.env.PUBLIC_FULL_URL;

    const gameURL: string = `${publicURL}${urlTranslate[siteID as keyof typeof urlTranslate]['game-pages']}/${gameSlug}`
	let message: string = "";
	const deviceID: any = window.navigator.userAgent;
	let isSubmissionSuccessfull = false;
  	let submissionLoader = false;


	const gdsBase = siteID === 'gds' ? '/it' : ''

	const dispatch = createEventDispatcher()

	const closeModal = () => {
		dispatch('click', {})
	}

	const validateForm = () => {
		if (!message) {
			alert("Please, choose an issue from the list!");
		} else {
			reportAnIssue();
		}
	};

	const reportAnIssue = async () => {
		submissionLoader = true;
		const issuePayload = {
			formName: 'Report Game Form',
			formData: {
				gameURL,
				message,
				deviceID
			}
		};
		
		const response = await fetch(
		`/api/reportAnIssue`,
		{
			method: "POST",
			body: JSON.stringify(issuePayload),
		}
		);
		const res = await response.json();
			// resetCaptcha();
		submissionLoader = false;
		if (res?.error) {
			// toast.error(res?.error.message);
		} else {
			isSubmissionSuccessfull = true;
			dispatch('click', {});
		}
  	};

//   const resetCaptcha = () => {
//     window.grecaptcha.reset();
//     recaptchaToken = "";
//   };
	
</script>

<div
	class="md:h-screen z-[999] w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-50"
>
	<!-- Modal -->
	<div class="bg-white self-center rounded-lg shadow-lg w-full md:w-1/3">
		<div class="border-b border-black p-5 flex justify-between items-center">
			<h2 class="text-primary m-0">{$getTranslations.reportAProblem}</h2>
			<button class="cursor-pointer" on:click={closeModal}>
				<Close width="30px" height="30px" />
			</button>
		</div>
		<div class="p-5">
			<form action="#" method="POST">
				<div class="form-heading">
					<p>{$getTranslations.reportAProblemContent}</p>
				</div>
				<div class="form-url">
					<label for="url" class="block text-sm font-medium leading-6 text-gray-900"
						>{$getTranslations.reportAProblemURL}</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="gameURL"
							id="gameURL"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							value={gameURL}
							readonly
						/>

						<!-- <input
							type="hidden"
							name="deviceID"
							id="deviceID"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							value={deviceID}
						/> -->
					</div>
				</div>

				<div class="mt-5">
					<div class="mb-3">
						<input
							bind:group={message}
							class="form-check-input"
							type="radio"
							name="message"
							id="message1"
							value={$getTranslations.reportAProblemMsg1}
						/>
						<label class="form-check-label" for="message1">{$getTranslations.reportAProblemMsg1}</label>
					</div>
					<div class="mb-3">
						<input
							bind:group={message}
							class="form-check-input"
							type="radio"
							name="message"
							id="message2"
							value={$getTranslations.reportAProblemMsg2}
						/>
						<label class="form-check-label" for="message2">{$getTranslations.reportAProblemMsg2}</label>
					</div>
					<div class="mb-3">
						<input
							bind:group={message}
							class="form-check-input"
							type="radio"
							name="message"
							id="message3"
							value={$getTranslations.reportAProblemMsg3}
						/>
						<label class="form-check-label" for="message3">{$getTranslations.reportAProblemMsg3}</label>
					</div>
					<div>
						<input
							bind:group={message}
							class="form-check-input"
							type="radio"
							value={$getTranslations.reportAProblemMsg4}
							name="message"
							id="message4"
						/>
						<label class="form-check-label" for="message4">{$getTranslations.reportAProblemMsg4}</label>
					</div>
				</div>

				<button 
				type="button" 
				class="rounded-md bg-primary py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm mt-5"
				 on:click={validateForm}>{$getTranslations.sendMessage}
				 {#if submissionLoader}
					 <span class="custom-spinner mr-2" aria-hidden="true" />
				 {/if}
				</button>
			</form>
		</div>
		<div class="border-t border-black px-5 py-2 flex justify-end">
			<button type="button" class="rounded-md bg-secondary py-2.5 px-10 text-sm font-semibold text-white shadow-sm mt-5" on:click={closeModal}>{$getTranslations.close}</button>
		</div>
	</div>
</div>
