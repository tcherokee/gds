<script>
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../../../lib/supabase.ts';
  
  export let gameId;
  
  let messages = [];
  let newMessage = '';
  let subscription;
  let user = null;
  
  onMount(async () => {
    // Get current user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    user = currentUser;

    // Load existing messages
    const { data } = await supabase
      .from('game_chat')
      .select('*')
      .eq('game_id', gameId)
      .order('created_at', { ascending: true })
      .limit(50);
    
    if (data) messages = data;

    // Subscribe to new messages
    subscription = supabase
      .channel('game_chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'game_chat',
        filter: `game_id=eq.${gameId}`
      }, payload => {
        messages = [...messages, payload.new];
      })
      .subscribe();
  });

  onDestroy(() => {
    if (subscription) subscription.unsubscribe();
  });

  async function sendMessage() {
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase
      .from('game_chat')
      .insert([
        {
          game_id: gameId,
          user_id: user.id,
          username: user.email.split('@')[0],
          content: newMessage.trim()
        }
      ]);

    if (!error) newMessage = '';
  }
</script>

<div class="chat-container">
  <div class="messages">
    <div class="flex flex-col h-full w-full">
      <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {#if !user}
          <div class="text-center text-white/70 p-8">
            Please sign in to participate in chat
          </div>
        {:else}
          {#each messages as message}
            <div class={`p-2 rounded max-w-[85%] ${
              message.user_id === user?.id 
                ? 'bg-[rgba(var(--accent),0.2)] self-end' 
                : 'bg-white/10'
            }`}>
              <span class="text-sm text-white/70 block mb-0.5">{message.username}</span>
              <p class="m-0 break-words">{message.content}</p>
            </div>
          {/each}
        {/if}
      </div>
    
      {#if user}
        <div class="flex gap-2 p-4 bg-black/20">
          <input
            type="text"
            bind:value={newMessage}
            placeholder="Type a message..."
            on:keydown={e => e.key === 'Enter' && sendMessage()}
            class="flex-1 p-2 border border-white/10 rounded bg-white/10 text-white outline-none"
          />
          <button 
            on:click={sendMessage}
            class="px-4 py-2 bg-[rgb(var(--accent))] rounded text-white cursor-pointer hover:bg-[rgb(var(--accent-light))] border-0"
          >
            Send
          </button>
        </div>
      {/if}
    </div>
  </div>

  {#if user}
    <div class="input-area">
      <input
        type="text"
        bind:value={newMessage}
        placeholder="Type a message..."
        on:keydown={e => e.key === 'Enter' && sendMessage()}
      />
      <button on:click={sendMessage}>Send</button>
    </div>
  {/if}
</div>