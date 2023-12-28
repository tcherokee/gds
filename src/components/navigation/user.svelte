<script lang="ts">
    import MediaQuery from "../helpers/mediaQuery.svelte"

    export let classes: string = ""

    let user: boolean = false
</script>

<a href="/authentication/login" class="pt-2 mt-1 px-2 pb-3 rounded-t {classes}">
    {#if user}
        <slot name="user-signed-in" />
    {:else}
        <slot name="user-signed-out" />
    {/if}
</a>
<!-- <div class="group/user">
    <button class="pt-2 mt-1 px-2 pb-3 rounded-t group-hover/user:bg-nav-hover-bkg">
        {#if user}
            <slot name="user-signed-in" />
        {:else}
            <slot name="user-signed-out" />
        {/if}
    </button>
    <div
        class="absolute w-max right-0 z-40 overflow-hidden rounded-b rounded-tl invisible transition ease-out translate-y-1 duration-200 opacity-0 group-hover/user:opacity-100 group-hover/user:translate-y-0 group-hover/user:transition group-hover/user:ease-in group-hover/user:duration-150 group-hover/user:visible"
        style="display"
    >
        <div class="relative grid gap-4 bg-nav-hover-bkg px-4 py-4">
            <a
                href="/authentication/login"
                class="block w-full text-center font-bold h-[37px] px-3 py-2 text-sm border rounded-lg border-white uppercase text-sm text-navbar-text mr-5">LOGIN</a
            >
            <a
                href="/authentication/register"
                class="block w-full text-center h-[37px] rounded-md btn-secondary px-3 py-2 text-sm font-semibold text-white uppercase text-sm text-navbar-text mr-5">SIGN UP</a
            >
        </div>
    </div>
</div> -->