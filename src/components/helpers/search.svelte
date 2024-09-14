<script lang="ts">

	import type { TranslationData } from "../../../interfaces/common/types.ts";

  	export let translationStore: TranslationData = {};

	type SearchToggleClass = 'open' | ''

	let searchToggleClass: SearchToggleClass = ''
	let searchInputValue: string = ''
	let searchMainClient: any
	let searchIcon: HTMLElement
	let searchInput: HTMLElement
	let closeIcon: HTMLElement
	let searchResults: HTMLElement
	let inputOpen: boolean = false

	const handleSearchToggle = () => {
		searchInput?.classList?.remove('no-animation')
		closeIcon?.classList?.remove('no-animation')
		searchIcon?.classList?.toggle('open')
		searchResults?.classList?.toggle('open')

		if (searchResults.classList?.contains('open')) {
			searchInput.focus()
			searchInputValue = ''
		} else {
			searchInputValue = ''
		}

		inputOpen = !inputOpen
	}

	const loadSearch = async () => {
		const { useMeilisearchMain } = await import('../../../lib/useMeiliSearch')

		const { searchMain } = useMeilisearchMain('no results')
		searchMainClient = searchMain
	}

	$: if (searchMainClient) {
		searchMainClient.helper.setQuery(searchInputValue)
		searchMainClient.helper.search()
	}
</script>

<div class="search-container {searchToggleClass}">
  <div id="searchIcon" bind:this={searchIcon} class="search-icon top-3.5 right-2 {searchToggleClass}">
    <input
		type="text"
		class="no-animation border-white"
		id="searchInput"
		placeholder={inputOpen ? `${translationStore.searchPlaceholder}` : ''}
		aria-describedby="searchInput"
		bind:this={searchInput}
		bind:value={searchInputValue}
    />
    <button on:click={handleSearchToggle} on:click|once={loadSearch}>
		<span id="closeIcon" bind:this={closeIcon} class="close-icon no-animation" />
    </button>
  </div>
</div>
<div
  id="searchResultsContainer"
  bind:this={searchResults}
  class="search-results-container ps-3 pe-3 pb-3 z-40"
  on:click={() => {
		searchToggleClass = ''
		searchInputValue = ''
	}}
>
  <div class="row d-flex align-items-start justify-content-center">
    <div class="col-md-9 col-sm-12 col-12 col-xl-9 col-xxl-9">
      <div class="search-results xl:container" id="hits"></div>
    </div>
  </div>
</div>

<style lang="postcss">
	:global(.ais-Hits-list) {
		list-style: none none;
	}

	.search-results-container {
		position: fixed;
		display: block;
		color: #fff;
		z-index: 0;
		overflow-y: scroll;
		opacity: 0;
		width: 0px;
		height: 0px;
		animation: opacityFadeOut 750ms 500ms forwards;

		&.open {
			padding-top: 120px;
			background-color: #000;
			width: 100vw;
			height: 100vh;
			left: 0;
			right: 0;
			top: 0;
			z-index: 30;
			animation: opacityFadeIn 750ms 500ms forwards;
		}

		.search-results {
			height: auto;
			pointer-events: fill;
		}
	}

	.search-container {
		z-index: 31;

		&:before {
			content: '';
			display: block;
			width: 40px;
			height: 40px;
		}

		.search-icon {
			position: absolute;
			display: inline-flex;
			width: 100%;

			input {
				position: absolute;
				background: transparent;
				right: 0;
				width: 30px;
				height: 30px;
				border-radius: 100%;
				padding: 0px;
				border-width: 4px;
				color: white;
				animation: inputEnd 750ms 500ms backwards;

				&.no-animation {
					animation: none;
				}
			}

			button {
				position: absolute;
				height: 40px;
				width: 30px;
				right: 0;

				span {
					&.no-animation {
						&:before,
						&:after {
							animation: none;
						}
					}

					&:before {
						position: absolute;
						content: '';
						display: block;
						background: white;
						height: 10px;
						width: 4px;
						transform: rotate(-45deg);
						top: 25px;
						right: 0px;
						animation: xSpanEnd 750ms 500ms backwards;
					}

					&:after {
						position: absolute;
						right: 60%;
						top: 13%;
						content: '';
						opacity: 0;
						display: block;
						background: white;
						height: 30px;
						width: 4px;
						transform: rotate(45deg);
						animation: xSpanAftEnd 750ms 500ms backwards;
					}
				}
			}

			&.open {
				width: 100%;

				input {
					padding: 5px;
					animation: inputStart 750ms 500ms forwards;
				}

                button {
                    span {
                        &:before {
                            animation: xSpanStart 750ms 500ms forwards;
                        }
                        &:after {
                            animation: xSpanAftStart 750ms 500ms forwards;
                        }
                    }
                }
			}
		}
	}

	@keyframes opacityFadeIn {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		5% {
			transform: scale(1);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 0.9;
		}
	}

	@keyframes opacityFadeOut {
		0% {
			transform: scale(1);
			opacity: 0.9;
		}
		95% {
			transform: scale(1);
			opacity: 0;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}

	@keyframes inputStart {
		0% {
			border-radius: 100%;
			height: 30px;
			width: 30px;
			transform-origin: left;
		}
		25% {
			border-radius: 8px;
			height: 40px;
			width: 30px;
			transform-origin: left;
		}
		100% {
			border-radius: 8px;
			height: 40px;
			width: calc(100% - 10px);
			transform-origin: left;
		}
	}

	@keyframes inputEnd {
		0% {
			border-radius: 8px;
			height: 40px;
			width: calc(100% - 10px);
			transform-origin: left;
		}
		75% {
			border-radius: 8px;
			height: 40px;
			width: 30px;
			transform-origin: left;
		}
		100% {
			border-radius: 100%;
			height: 30px;
			width: 30px;
			transform-origin: left;
		}
	}

	@keyframes xSpanStart {
		0% {
			opacity: 1;
			transform: scale(1) rotate(-45deg);
			top: 25px;
			right: 0px;
			height: 10px;
		}
		15% {
			opacity: 0;
			transform: scale(1) rotate(-45deg);
			top: 25px;
			right: 0px;
			height: 10px;
		}
		20% {
			opacity: 0;
			transform: scale(0) rotate(-45deg);
			top: 13%;
			right: 60%;
			top: 13%;
			height: 30px;
		}
		50% {
			transform: scale(0) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 20px;
		}
		80% {
			transform: scale(1.2) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 30px;
		}
		100% {
			transform: scale(1) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 30px;
		}
	}

	@keyframes xSpanEnd {
		0% {
			transform: scale(1) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 30px;
		}
		20% {
			transform: scale(1.2) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 30px;
		}
		50% {
			transform: scale(0) rotate(-45deg);
			opacity: 1;
			top: 13%;
			right: 60%;
			height: 20px;
		}
		80% {
			opacity: 0;
			transform: scale(0) rotate(-45deg);
			top: 13%;
			right: 60%;
			top: 13%;
			height: 30px;
		}
		85% {
			opacity: 0;
			transform: scale(1) rotate(-45deg);
			top: 25px;
			right: 0px;
			height: 10px;
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(-45deg);
			top: 25px;
			right: 0px;
			height: 10px;
		}
	}

	@keyframes xSpanAftStart {
		0% {
			opacity: 0;
			transform: scale(0) rotate(45deg);
		}
		50% {
			opacity: 1;
			transform: scale(0) rotate(45deg);
		}
		80% {
			opacity: 1;
			transform: scale(1.2) rotate(45deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(45deg);
		}
	}

	@keyframes xSpanAftEnd {
		0% {
			opacity: 1;
			transform: scale(1) rotate(45deg);
		}
		20% {
			opacity: 1;
			transform: scale(1.2) rotate(45deg);
		}
		50% {
			opacity: 1;
			transform: scale(0) rotate(45deg);
		}
		100% {
			opacity: 0;
			transform: scale(0) rotate(45deg);
		}
	}
</style>
