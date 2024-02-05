<script lang="ts">

    import { favourite } from "../../../stores/favouriteStore";
    import Heart from "~icons/kensho-icons/heart"

    export let game: any
    export let classes: string

    $: isFavourited = $favourite.some(fav => fav.title === game?.attributes.title)

    const handleFavs = () => {
        if (isFavourited) {

            // If the game has been favourited, filter out the favourites excluding the favourite game
            const filterOutFav = $favourite.filter(fav => fav.title !== game?.attributes?.title)

            //Set the favourites to the new array excluding the game which was previously favourited
            favourite.set(filterOutFav)
            
        } else {
            favourite.set([...$favourite, game.attributes])
        }
    }

</script>

<button class={classes} on:click={handleFavs}>
	<Heart class={isFavourited ? "fill-filled-favs" : "fill-unfilled-favs"}/>
</button>