<script lang="ts">

// Components
import AdCasinoTable from "../casino/adCasinoTable.svelte";

export let data;
export let translationStore;

</script>

<AdCasinoTable
  casinos={data}
  translations={translationStore}
/>
