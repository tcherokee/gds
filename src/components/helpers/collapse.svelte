<script lang="ts">
  import PlusIcon from '~icons/kensho-icons/plus';
  import MinusIcon from '~icons/kensho-icons/minus';

  export let id: string;
  export let label: string;
  export let containerClass = '';
  export let labelIcon = '';
  export let inputClass = '';
  export let labelClass = '';
  export let collapseClass = '';
  export let checked = false;
</script>

<div class={containerClass}>
  <input 
    {id}
    class="toggle hidden peer {inputClass}" 
    type="checkbox"
    bind:checked
  />
  <label 
    for={id} 
    class="group flex justify-between rounded-md cursor-pointer peer-checked:rounded-b-none {labelClass}"
    tabindex="-1"
  >
    <div>
      {#if labelIcon}
        {@html labelIcon}
      {/if}
      <span>{label}</span>
    </div>
    <slot name="icon">
      <div class="hidden peer-checked:group-[]:flex">
        <MinusIcon width="25" height="25" class="fill-white" />
      </div>
      <div class="flex peer-checked:group-[]:hidden">
        <PlusIcon width="25" height="25" class="fill-white" />
      </div>
    </slot>
  </label>
  <div class="p-0 max-h-0 overflow-hidden transition-all peer-checked:max-h-max peer-checked:p-3 {collapseClass}">
    <slot name="content" />
  </div>
</div>

<!-- <style>
  :global(.peer:checked) ~ .peer-checked\:max-h-max {
    max-height: max-content;
  }
  
  :global(.peer:checked) ~ .peer-checked\:p-3 {
    padding: 0.75rem;
  }
  
  :global(.peer:checked) + label.peer-checked\:rounded-b-none {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>  -->