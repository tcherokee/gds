<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../../../lib/supabase.ts';
  import { user as userStore } from '../../../stores/authStore';
  import type { TUser } from '../../../interfaces/auth';
  
  export let gameId: number | string;  // Allow both number and string types
  
  let messages = [];
  let newMessage = '';
  let subscription;
  let user: TUser | null = null;
  
  // Subscribe to the auth store
  userStore.subscribe((value) => {
    user = value as TUser;
  });

  console.log('user', user)
  
  let messagesContainer: HTMLDivElement;

  onMount(async () => {
    // Check auth status first
    const { data: { user: authUser } } = await supabase.auth.getUser();
    console.log('Auth status on mount:', authUser);
    
    if (!authUser) {
        console.log('No authenticated user found');
        return;
    }

    // Load existing messages
    const { data } = await supabase
      .from('game_chat')
      .select('*')
      .eq('game_id', gameId)
      .order('created_at', { ascending: true })
      .limit(50);
    
    if (data) messages = data;

    // Update subscription setup

    subscription = supabase
      .channel(`game_chat_${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_chat',
          filter: `game_id=eq.${gameId}`
        },
        (payload) => {
          console.log('Received message:', payload);
          messages = [...messages, payload.new];
          // Scroll to bottom when new message arrives
          setTimeout(() => {
            messagesContainer?.scrollTo({
              top: messagesContainer.scrollHeight,
              behavior: 'smooth'
            });
          }, 100);
        }
      )
      .subscribe();
  });

    // console.log('Auth status:', await supabase.auth.getUser());

  onDestroy(() => {
    if (subscription) {
      console.log('Unsubscribing from chat...');
      subscription.unsubscribe();
    }
  });

  async function sendMessage() {
    if (!newMessage.trim() || !user) return;

    // Get the authenticated Supabase user
    const { data: { user: authUser } } = await supabase.auth.getUser();  // Changed variable name to authUser
    console.log('Current auth user:', authUser);
    console.log('User metadata:', authUser?.user_metadata);
    console.log('Store user:', user);  // Your original user from the store

    // And log the exact payload you're sending
    const payload = {
        game_id: Number(gameId),
        user_id: Number(user.id),  // Using store user ID
        username: user.username,
        content: newMessage.trim()
    };
    console.log('Message payload:', payload);
  
    const { error } = await supabase
      .from('game_chat')
      .insert([payload]);
  
    if (error) {
      console.error('Error sending message:', error);
      return;
    }
    
    if (!error) newMessage = '';
  }
</script>

<div class="chat-container">
  <div class="messages">
    <div class="flex flex-col h-full">
      <div class="flex-1 min-h-0"> <!-- Add min-h-0 to ensure proper scrolling -->
        <div class="h-full flex flex-col">
          // In your template, add bind:this to the messages container
          <div 
            class="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
            bind:this={messagesContainer}
          >
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
            <div class="sticky bottom-0 flex gap-2 p-4 bg-black/20 border-t border-white/10">
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
    </div>
  </div>
</div>