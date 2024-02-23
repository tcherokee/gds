<script>
	import { onMount } from 'svelte'
    
	export let translations;
	export let playbackUrl;
	let player;
	let isMute = true;
	let isPlaying = false;

	onMount(() => {
		const videoPlayer = document.getElementById('casino-live-video');
		// const playbackUrl = videoPlayer?.getAttribute('data-url')

        setTimeout(() => {
            if (playbackUrl) {
                videoPlayer?.classList.add('object-cover');
                videoPlayer?.classList.add('w-full');
                videoPlayer?.classList.add('rounded-lg');
                ;(function (IVSPlayer) {
                    const PlayerState = IVSPlayer?.PlayerState;
                    const PlayerEventType = IVSPlayer?.PlayerEventType;
    
                    // Initialize player
                    player = IVSPlayer?.create()
                    if (player) {
                        player.attachHTMLVideoElement(videoPlayer);
        
                        // Attach event listeners
                        player.addEventListener(PlayerState.PLAYING, function () {
                            isPlaying = true;
                        })
                        player.addEventListener(PlayerState.ENDED, function () {});
                        player.addEventListener(PlayerState.READY, function () {});
                        player.addEventListener(PlayerEventType.ERROR, function (err) {});
                        player.addEventListener(PlayerEventType.AUDIO_BLOCKED, function (err) {});
        
                        // player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, function (cue) {
                        // 	const metadataText = cue.text
                        // 	const position = player.getPosition().toFixed(2)
                        // })
        
                        // Setup stream and play
                        player.setAutoplay(true);
                        player.load(playbackUrl);
                        player.setMuted(true);
        
                        // Setvolume
                        // player.setVolume(0.5)
                    }
                })(window.IVSPlayer);
            }
        }, 1000);
	})

	const toggleVideoMuteState = () => {
		player.setMuted(!isMute)
		isMute = !isMute
	}
</script>

<svelte:head>
	<script src="https://player.live-video.net/1.22.0/amazon-ivs-player.min.js"></script>
</svelte:head>

<div class="relative py-5">
	<div class="relative xl:container px-2 pb-5">
		{#if !isPlaying}
			<div class="absolute w-full h-full flex justify-center items-center">
				<svg
					class="animate-spin h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</div>
		{:else}
			<div
				class="absolute bottom-4 right-4 text-white cursor-pointer z-30"
				on:click={toggleVideoMuteState}
			>
				{#if isMute}
					<span>{translations.unMute}</span>
				{:else}
					<span>{translations.mute}</span>
				{/if}
			</div>
		{/if}
		<video
			id="casino-live-video"
			class="object-cover w-full h-full"
			data-url={playbackUrl}
			playsinline
		/>
	</div>
</div>
