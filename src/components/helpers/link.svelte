<script lang="ts">
    export let href: string
    export let classes: string = ''

    // IF href is relative include base url
    const includeBasePath = href.includes('http://') || href.includes('https://') || href.includes('www') ? '' : import.meta.env.BASE_URL;
</script>

<a href={`${includeBasePath}${href}`} class={`link ${classes}`} {...$$restProps}>
  <slot />
</a>
