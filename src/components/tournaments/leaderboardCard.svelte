<script>
  export let rank;
  export let username;
  export let points;
  export let prize;
  export let isTopThree = false;
</script>

<div class={`flex items-center p-4 bg-white rounded-xl mb-2 shadow-sm relative transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-md 
  ${isTopThree ? 'flex-col items-stretch pt-8 pb-5 px-5 mb-0 bg-white/70 backdrop-blur-md border border-white/30 shadow-lg w-[calc(33.33%-0.5rem)]' : ''}`}>
  <div class={`text-primary font-bold ${isTopThree ? 'absolute top-3 left-3 text-xl' : 'w-[50px]'}`}>
    #{rank}
  </div>
  {#if isTopThree}
    <div class="flex flex-col items-center gap-3 text-center">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="Profile" class="w-[60px] h-[60px] rounded-full bg-gray-100" />
      <div class="text-primary font-bold">{username}</div>
      <div class="text-secondary text-sm">{points.toLocaleString()} points</div>
      <div class="text-accent font-bold mt-2">£{prize}</div>
    </div>
  {:else}
    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="Profile" class="w-10 h-10 rounded-full mr-4 bg-gray-100" />
    <div class="flex-1">
      <div class="text-primary font-bold mb-1">{username}</div>
      <div class="text-secondary text-sm">{points.toLocaleString()} points</div>
    </div>
    <div class="text-accent font-bold">£{prize}</div>
  {/if}
</div>