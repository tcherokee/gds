<script lang="ts">

// Components
import AdCasinoTable from "../casino/adCasinoTable.svelte";

export let data;
export let translationStore;

</script>

<!-- <script define:vars={{ translationStore }}>
  console.log("translationStore", translationStore);
</script> -->
<AdCasinoTable
  casinos={data}
  translations={translationStore}
/>
