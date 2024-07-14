<script>
	import { serializeSchema } from '../../../lib/json-ld';
	
	export let schema;
</script>

<svelte:head>
	{@html serializeSchema(schema)}
</svelte:head>