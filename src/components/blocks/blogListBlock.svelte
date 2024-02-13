<script lang="ts">

    // Component
    // import BlogCard from "../blogs/blogCard.astro"

    export let data
	
</script>

<div>
	<div class="blog-container">
		<div class="flex flex-col">
			<!-- <BlogCard data={truncatedData} /> -->
		</div>
	</div>
</div>

<style lang="postcss">
	.blog-container {
		:global(.blog-card) {
			margin-right: 15px;
			margin-bottom: 10px;
		}
	}

	.blog-wrap {
		display: flex;
	}

	@media (max-width: 650px) {
		.blog-wrap {
			flex-direction: column;
		}
	}

	:global(.blog-btn) {
		width: fit-content;
		padding: 10px;
		text-transform: uppercase;
	}
</style>