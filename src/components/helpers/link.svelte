<script lang="ts">
    export let href: string
    export let classes: string = ''

    let newHref: string = href

    // If href starts with / remove it
    if (href.startsWith('/')) {
        newHref = href.substring(1);
    }
    // IF href is relative include base url
    const includeBasePath = newHref ? newHref.includes('http://') || newHref.includes('https://') || newHref.includes('www') ? '' : import.meta.env.BASE_URL : '';

</script>

<a href={`${includeBasePath}${newHref}`} class={`link ${classes}`} {...$$restProps}>
  <slot />
</a>
