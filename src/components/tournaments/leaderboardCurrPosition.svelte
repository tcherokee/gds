<script>
  export let rank;
  export let username;
  export let points;
  export let prize;
</script>

<div class="my-8">
  <div class="text-primary font-semibold mb-2 text-sm">Your Current Position</div>
  <div class="flex items-center p-4 bg-white/90 rounded-xl shadow-sm border-2 border-primary transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-md">
    <div class="text-primary font-bold w-[50px]">#{rank}</div>
    <div class="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
    <div class="flex-1">
      <div class="text-primary font-bold mb-1">{username}</div>
      <div class="text-secondary text-sm">{points.toLocaleString()} points</div>
    </div>
    <div class="text-accent font-bold">€{prize}</div>
  </div>
</div>