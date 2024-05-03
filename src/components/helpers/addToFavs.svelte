<script lang="ts">
  import type { GameAttributes, TUserGame } from "../../../interfaces/games";
  import { favourite } from "../../../stores/favouriteStore";
  import {
    user,
    userFavouriteGames,
    getUserFavouriteGames,
  } from "../../../stores/authStore";
  import Heart from "~icons/kensho-icons/heart";
    // import { getTranslations } from "../../../stores/addTranslations.ts";
  import { toast } from "svoast";
  import type { TranslationData } from "../../../interfaces/common/types.ts";

  export let game: TUserGame | { attributes: GameAttributes };
  export let classes: string;
  export let translations: TranslationData = {};
  let isFavourited = false;
  const gameId =
    (game as { attributes: GameAttributes })?.attributes?.id ??
    (game as TUserGame)?.id;

  $: {
    const favouritedGame = $favourite.find(({ id }) => id === gameId);
    if (favouritedGame) {
      isFavourited = true;
    } else {
      if ($userFavouriteGames?.length) {
        const userFavouritedGame = $userFavouriteGames.find(
          ({ game }) => game.id === gameId
        );
        if (userFavouritedGame) {
          isFavourited = true;
        }
      } else {
        isFavourited = false;
      }
    }
  }

  const handleFavs = async () => {
    if (isFavourited) {
      // If the game has been favourited, filter out the favourites excluding the favourite game
      const filterOutFav = $favourite.filter(({ id }) => id !== gameId);

      //Set the favourites to the new array excluding the game which was previously favourited
      favourite.set(filterOutFav);
      toast.error(translations?.removeToFav)
      if ($user) {
        const userFavouritedGame = $userFavouriteGames.find(
          ({ game }) => game.id === gameId
        );
        if (userFavouritedGame) {
          const response = await fetch(
            `${import.meta.env.BASE_URL}api/dashboard/user-games-delete/?` + new URLSearchParams(`favoriteId=${userFavouritedGame.id}`),
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            const res = await response.json();
            getUserFavouriteGames();
          }
        }
      }
    } else {
      // favourite.set([...$favourite, game.attributes])
      let categories: Array<{ title: string }> = [];
      if ((game as { attributes: GameAttributes })?.attributes?.categories) {
        categories = [
          ...(
            game as { attributes: GameAttributes }
          )?.attributes?.categories.data.map((category) => {
            return { title: category.attributes.title + "" };
          }),
        ];
      }
      if ((game as TUserGame).categories) {
        categories = [...(game as TUserGame).categories];
      }

      const favouritedGame = {
        id: gameId,
        title:
          (game as { attributes: GameAttributes })?.attributes?.title ??
          (game as TUserGame)?.title,
        slug:
          (game as { attributes: GameAttributes })?.attributes?.slug ??
          (game as TUserGame)?.slug,
        ratingAvg:
          (game as { attributes: GameAttributes })?.attributes?.ratingAvg ??
          (game as TUserGame)?.ratingAvg,
        publishedAt:
          (game as { attributes: GameAttributes })?.attributes?.publishedAt ??
          (game as TUserGame)?.publishedAt,
        provider: {
          slug:
            (game as { attributes: GameAttributes })?.attributes?.provider?.data
              ?.attributes?.slug ?? (game as TUserGame)?.provider?.slug,
          title:
            (game as { attributes: GameAttributes })?.attributes?.provider?.data
              ?.attributes?.title ?? (game as TUserGame)?.provider?.title,
        },
        images: {
          url:
            (game as { attributes: GameAttributes })?.attributes?.images?.data
              ?.attributes?.url ?? (game as TUserGame)?.images?.url,
        },
        categories,
      };
      favourite.set([...$favourite, favouritedGame]);
      toast.success(translations?.addToFav)

      if ($user) {
        const response = await fetch(`${import.meta.env.BASE_URL}api/dashboard/user-games-add/`, {
          method: "POST",
          body: JSON.stringify({
            games: [gameId],
          }),
        });
        const res = await response.json();
        getUserFavouriteGames();
      }
    }
  };
</script>

<button class={classes} on:click={handleFavs}>
  <Heart class={isFavourited ? "fill-filled-favs" : "fill-unfilled-favs"} />
</button>
