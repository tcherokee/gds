<script lang="ts">
  export let data: any;
  export let gamePageURL: string;
  export let slug: string;
  export let translations: TranslationData = {};

  // Helpers
  import fetchGamesApi from "../../../lib/gamesApi";

  // Svelte Stuff
  import { urlTranslate } from "../../../utils/data-store.util";

  import AddToFav from "../helpers/addToFavs.svelte";
  import Images from "../helpers/images.svelte";
  import Link from "../helpers/link.svelte";
  import ReportAnIssue from "./reportAnIssue.svelte";

  // Import Images
  import Chevrondown from "~icons/kensho-icons/chevron-down";
  import Danger from "~icons/kensho-icons/exclamation";
  import Fullscreen from "~icons/kensho-icons/fullscreen";
  import Info from "~icons/kensho-icons/info-no-circle";
  import NoGameImage from "~icons/kensho-icons/no-game";
  import Reload from "~icons/kensho-icons/reload";
  import Close from "~icons/kensho-icons/xmark";
  import type { TranslationData } from "../../../interfaces/common/types";
  import RatingStar from "../helpers/ratingStar.svelte";
  import { onMount } from "svelte";

  let fullscreen: boolean = false;
  let startGame: boolean = false;
  let iframeWrapper: any;
  let iframeElement: any;
  let ReportAnIssueOpen: boolean = false;
  let gamePlayerClass = "game-player";
  let gamesData: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  let hoverEl: any;

  let siteID = import.meta.env.PUBLIC_SITE_ID;
  let casinoProviderPageURL =
    urlTranslate[siteID as keyof typeof urlTranslate]["casino-providers-page"] +
    "/" +
    data?.attributes?.provider?.data?.attributes?.slug;
  let providePageURL =
    urlTranslate[siteID as keyof typeof urlTranslate]["provider-pages"] +
    "/" +
    data?.attributes?.provider?.data?.attributes?.slug;

  
  const gamesAPI = async (slug: string) => {
    try {
      const games = await fetchGamesApi({
        endpoint: "slots",
        query: `/slug/${slug}/embed-data`,
      });
      return games;
    } catch (error) {
      console.error("Error fetching games data:", error);
      return null;
    }
  };

  const startGameHandler = async () => {
    startGame = true;
    mostPlayedGamesHandler();
  };

  const mostPlayedGamesHandler = async () => {
    const gameViewVariables = {
      id: data.id,
      views: 1
    };
    const res = await fetch(
        `${import.meta.env.PUBLIC_FULL_URL}/api/games/games?` +
          new URLSearchParams(gameViewVariables),
        { method: "PUT" }
      );
    const user = await window.localStorage.getItem("_user:");
    if (user) {
      const payload = {
        game: data.attributes.slug,
      };
      const response = await fetch(
        `${import.meta.env.BASE_URL}api/dashboard/most-played-games/?` +
          new URLSearchParams(payload),
        {
          method: "POST",
        }
      );
      const res = await response.json();
    }
  };

  const handleReload = () => {
    if (startGame && iframeWrapper.innerHTML !== "") {
      iframeWrapper.innerHTML = data?.attributes?.embedCode?.desktopEmbedCode;
      mostPlayedGamesHandler();
    }
  };

  const ReportAnIssueModal = () => {
    ReportAnIssueOpen = !ReportAnIssueOpen;
    // check if game player is in fullscreen and close the fullscreen
    // so that report issue form can be seen.
    fullscreen ? gameInFullscreenToggle() : "";
  };

  const gameInFullscreenToggle = () => {
    const favBtnNav = document.getElementById("fav-search");
    const burgerMenu = document.getElementById("burger-menu");
    const backToTop = document.getElementById("back-to-top");
    
    fullscreen = !fullscreen;
    if(fullscreen) {
      (gamePlayerClass = "game-player-fullscreen")
      if(favBtnNav) favBtnNav.style["z-index"] = -1;
      if(burgerMenu) burgerMenu.style["z-index"] = -1;
      if(backToTop) backToTop.style["z-index"] = -1;
    } else {
      (gamePlayerClass = "game-player");
       if(favBtnNav) favBtnNav.style["z-index"] = 40;
       if(burgerMenu) burgerMenu.style["z-index"] = 40;
       if(backToTop) backToTop.style["z-index"] = 40;
    }

  };

  const showTooltip = (elementID: any) => {
    hoverEl = document.getElementById(elementID);
    hoverEl.classList.remove("hidden");
  };
  const hideTooltip = (elementID: any) => {
    hoverEl = document.getElementById(elementID);
    hoverEl.classList.add("hidden");
  };

  //function to update iframe url with the sites language code

  function updateURLWithLang(url, lang) {
    const parsedUrl = new URL(url);
    const searchParams = new URLSearchParams(parsedUrl.search);
    
    if (searchParams.has('language')) {
      searchParams.set('language', lang);
    } else if (searchParams.has('lang')) {
      searchParams.set('lang', lang);
    }
    
    parsedUrl.search = searchParams.toString();
    return parsedUrl.toString();
  }

  onMount(async () => {
    try {
      gamesData = await gamesAPI(slug);
      if (gamesData && gamesData.iframeURL) {
        const updatedURL = updateURLWithLang(gamesData.iframeURL, import.meta.env.PUBLIC_LANG);
        iframeElement.src = updatedURL;
      }

      console.log(gamesData)
    } catch (err) {
      error = "Failed to fetch games data";
    }
  });
</script>

<div class="flex flex-col justify-center rounded-t-lg -mx-3 md:mx-0">
  <div class={gamePlayerClass}>
    <div class="float-close-btn">
      <div class="buttons">
        <button type="button" class="btn btn-link">
          <Chevrondown width="25px" height="17px" />
        </button>
        <button
          type="button"
          class="btn btn-link reload"
          on:click={handleReload}
        >
          <Reload width="25px" height="17px" />
        </button>
        <AddToFav
          classes="btn btn-link heart bg-[#7C838D] mb-[5px] w-[30px] h-[30px] flex items-center justify-items-center rounded-full"
          game={data}
          {translations}
        />
        <button
          type="button"
          class="btn btn-link report-issue"
          data-bs-toggle="modal"
          data-bs-target="#expandReportGame"
          on:click={ReportAnIssueModal}
        >
          <Danger width="25px" height="17px" />
        </button>
        <button
          type="button"
          class="btn btn-link"
          on:click={gameInFullscreenToggle}
        >
          <Close width="25px" height="17px" />
        </button>
      </div>
    </div>
    {#if !startGame}
      <div class="start-game-overlay">
        {#if data?.attributes?.isGameDisabled}
          <NoGameImage height="100px" />
          <h3 class="mt-5 text-white mb-4">
            {data.attributes?.gameDisableText
              ? data.attributes?.gameDisableText
              : ""}
          </h3>
        {:else}
          <div class="flex items-center mb-3">
            <h3 class="game-title mr-3 !my-0 mt-10 mb-4">
              {data?.attributes?.title}
            </h3>
            <div class="game-provider text-white text-xs">
              da <Link href={`${providePageURL}/`} classes="uppercase">
                {data?.attributes?.provider?.data?.attributes?.title}
              </Link>
            </div>
          </div>
          <Images
            imageUrl={data?.attributes?.images?.data?.attributes?.url}
            imageWidth={190}
            imageHeight={197}
            imageClass="providerImage"
            imageAlt={data?.attributes?.title}
          />
          <div
            class="btn btn-secondary free-play uppercase my-5"
            on:click={startGameHandler}
          >
            {translations?.playFunBtn}
          </div>

          <div class="age-warning">
            {translations?.ageWarning}
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex h-full w-full" bind:this={iframeWrapper}>
        {#if gamesData && gamesData.iframeURL}
          <iframe src={gamesData.iframeURL} width="100%" height="100%" name={data?.attributes?.title} title="gamesapi" bind:this={iframeElement} />
        {:else}
          {@html data?.attributes?.embedCode?.desktopEmbedCode}
        {/if}
      </div>
    {/if}
  </div>

  <div
    class="game-footer rounded-b-lg md:p-1.5 flex flex-wrap items center bg-transparent md:bg-white justify-between md:justify-center md:bg-slate-400 w-full"
  >
    <div
      class="provider-meta p-2.5 md:p-0 flex order-1 bg-white grow md:grow-0"
    >
      <div class="flex items-center md:w-[105px] mdc:w-auto">
        <h2 class="leading-tight text-base m-0">
          {data?.attributes?.title}
        </h2>
      </div>
    </div>
    <div
      class="px-2.5 shrink-0 justify-between basis-full flex items-center order-3 grow-0 md:basis-[300px] md:grow mt-4 md:mt-0 md:order-2"
    >
      <div
        class="bg-grey-100 p-2.5 md:p-0 md:bg-white shrink-0 justify-between basis-full flex items-center order-3 grow-0 md:basis-[300px] md:grow rounded-lg md:rounded-none md:border-0 md:order-2"
      >
        <div class="ml-0 md:ml-4">
          <RatingStar
            avgRating={data?.attributes?.ratingAvg}
            ratingClasses="flex-col"
            ratingCount={data?.attributes?.ratingCount}
            itemId={data?.id + ""}
            ratingType={"games"}
            {translations}
          />
          <!-- <ReadOnlyRatings
            avgRating={data?.attributes?.ratingAvg}
            showVotes={true}
            ratingClasses="flex-col"
          /> -->
        </div>

        <div
          class=" md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center md:m-auto"
        >
          <Link
            href={`${casinoProviderPageURL}/`}
            classes="btn btn-misc btn-real-money w-32 md:w-[200px] mr-3 uppercase"
            >{translations.playRealBtn}</Link
          >
          <div class="buttons">
            <button
              type="button"
              class="btn btn-link info"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="Consulta la lista dei casino online che offrono questo gioco e delle loro offerte di benvenuto Giochi di Slots ricorda che il gioco è vietato ai minori di età"
              on:mouseover={() => showTooltip("game-info-tooltip")}
              on:focus={() => showTooltip("game-info-tooltip")}
              on:mouseout={() => hideTooltip("game-info-tooltip")}
            >
              <Info width="25px" height="15px" />
              <div
                id="game-info-tooltip"
                role="tooltip"
                class="hidden px-5 text-black -ml-[180px] md:-ml-[0px] opacity-100 bg-grey-100 text-sm z-20 -mt-[11rem] w-[220px] absolute transition duration-150 ease-in-out shadow-lg p-2 rounded"
              >
                {translations?.gameInfoText}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    {#if !data?.attributes?.isGameDisabled}
      <div
        class="player-controls order-2 md:order-3 pr-2.5 md:pr-0 flex items-center bg-white grow md:grow-0 justify-end"
      >
        <div class="buttons flex gap-x-1">
          <button
            type="button"
            class="btn relative btn-link fullscreen-btn text-primary transition duration-50 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            on:click={gameInFullscreenToggle}
            on:mouseover={() => showTooltip("fullscreen-tooltip")}
            on:focus={() => showTooltip("fullscreen-tooltip")}
            on:mouseout={() => hideTooltip("fullscreen-tooltip")}
          >
            <Fullscreen width="25px" height="17px" />
            <div
              id="fullscreen-tooltip"
              role="tooltip"
              class="hidden px-5 text-black opacity-100 bg-grey-100 text-sm z-20 -mt-20 w-[150px] absolute transition duration-150 ease-in-out shadow-lg p-2 rounded"
            >
              {translations?.fullscreen}
            </div>
          </button>
          <button
            type="button"
            class="relative btn btn-link reload text-primary transition duration-50 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            on:click={handleReload}
            on:mouseover={() => showTooltip("reload-tooltip")}
            on:focus={() => showTooltip("reload-tooltip")}
            on:mouseout={() => hideTooltip("reload-tooltip")}
          >
            <Reload width="25px" height="17px" />
            <div
              id="reload-tooltip"
              role="tooltip"
              class="hidden px-5 text-black opacity-100 bg-grey-100 text-sm z-20 -mt-20 w-[150px] absolute transition duration-150 ease-in-out shadow-lg p-2 rounded"
            >
              {translations?.reloadGame}
            </div>
          </button>
          <div
            on:mouseover={() => showTooltip("favourite-tooltip")}
            on:focus={() => showTooltip("favourite-tooltip")}
            on:mouseout={() => hideTooltip("favourite-tooltip")}
          >
            <AddToFav
              classes="btn relative btn-link heart bg-[#CED4DA] rounded-[5px] w-[30px] h-[30px] flex items-center justify-items-center border border-[#7C838D"
              game={data}
              {translations}
            />
            <div
              id="favourite-tooltip"
              role="tooltip"
              class="hidden px-5 text-black opacity-100 bg-grey-100 text-sm z-20 -mt-20 -ml-[180px] w-fit absolute transition duration-150 ease-in-out shadow-lg p-2 rounded"
            >
              {translations?.favouriteAGame}
            </div>
          </div>
          <button
            type="button"
            class="btn btn-link report-issue m-0 relative"
            on:click={ReportAnIssueModal}
            on:mouseover={() => showTooltip("report-tooltip")}
            on:focus={() => showTooltip("report-tooltip")}
            on:mouseout={() => hideTooltip("report-tooltip")}
          >
            <Danger width="25px" height="17px" />
            <div
              id="report-tooltip"
              role="tooltip"
              class="hidden px-5 text-black opacity-100 bg-grey-100 text-sm z-20 -mt-20 -ml-[180px] w-fit absolute transition duration-150 ease-in-out shadow-lg p-2 rounded"
            >
              {translations?.reportAGame}
            </div>
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

{#if ReportAnIssueOpen}
  <ReportAnIssue {gamePageURL} {translations} on:click={ReportAnIssueModal} />
{/if}

<style lang="scss">
  .game-player-fullscreen {
    @apply h-full w-full fixed left-0 top-0 flex justify-center bg-black z-[40];

    .float-close-btn {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      position: absolute;
      top: 0px;
      z-index: 999;
      margin: 20px;
      right: 0px;
      border-radius: 10px;
      height: 40px;
      overflow: hidden;

      &:hover {
        height: max-content;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        padding: 10px;

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          padding: 0;
          background: theme("colors.gameplayer-meta-btn-bkg");
          border: 1px solid theme("colors.gameplayer-meta-btn-border");
          margin-bottom: 5px;

          &:last-child {
            margin-right: 0;
          }

          &.heart {
            :global(svg) {
              fill: transparent;
            }

            &.filled {
              :global(svg) {
                fill: theme("colors.filled-fav");
              }
            }
          }

          &.report-issue {
            background: theme("colors.gameplayer-report-issue-bkg");
            border-color: theme("colors.gameplayer-report-issue-bdr");

            :global(svg) {
              fill: theme("colors.gameplayer-report-issue-fill");
            }
          }

          &.close {
            display: none;
          }
        }
      }
    }
  }
  .game-player {
    @apply md:px-3 md:h-[700px] rounded-lg flex flex-col items-center justify-center bg-black aspect-video;
    display: flex;
    background: theme("colors.black");
    border-radius: 4px;
    overflow: hidden;
    position: static;
  }

  .float-close-btn {
    display: none;
  }
  .start-game-overlay {
    display: flex;
    flex-direction: column;
    background: theme("colors.black");
    align-items: center;
    justify-content: center;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 10px;

    :global(img) {
      display: none;
      border-radius: 4px;
      overflow: hidden;

      @media (min-width: theme("screens.sm")) {
        display: block;
      }
    }

    .game-title {
      color: theme("colors.white");
      font-size: 14px;
      text-transform: uppercase;
    }

    .age-warning {
      color: theme("colors.white");
      font-size: 11px;
      border: 1px solid theme("colors.danger");
      border-radius: 4px;
      padding: 5px;
      text-align: center;
    }
  }

  .buttons {
    display: flex;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      padding: 0;
      background: theme("colors.grey[300]");
      border: 1px solid theme("colors.grey[500]");

      &.heart {
        :global(svg) {
          fill: transparent;
        }

        &.filled {
          :global(svg) {
            fill: theme("colors.filled-fav");
          }
        }
      }

      &.report-issue {
        background: theme("colors.gameplayer-report-issue-bkg");
        border-color: theme("colors.gameplayer-report-issue-bdr");

        :global(svg) {
          fill: theme("colors.gameplayer-report-issue-fill");
        }
      }
      &.close {
        display: none;
      }

      &.info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        padding: 0;
        background: theme("colors.grey[300]");
        border: 1px solid theme("colors.grey[500]");
        margin-right: auto;
      }
    }
  }
</style>
