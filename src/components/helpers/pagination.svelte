<script>
  export let currentPage = 1;
  export let totalPages = 5;
</script>

<div class="flex gap-2 justify-center mt-8">
  <button 
    class="px-4 py-2 border border-gray-200 bg-white rounded-md text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100" 
    disabled={currentPage === 1}
  >
    Previous
  </button>
  
  {#each Array(totalPages) as _, i}
    <button 
      class={`px-4 py-2 border border-gray-200 bg-white rounded-md text-primary hover:bg-gray-100 
        ${currentPage === i + 1 ? 'bg-primary text-white border-primary hover:bg-primary/90' : ''}`}
    >
      {i + 1}
    </button>
  {/each}
  
  <button 
    class="px-4 py-2 border border-gray-200 bg-white rounded-md text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100" 
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>