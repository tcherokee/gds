<script lang="ts">
  import Image from "../helpers/images.svelte";
  import { urlTranslate } from "../../../utils/data-store.util";

  // Components
  import Link from "../helpers/link.svelte";
  import type { TranslationData } from "../../../interfaces/common/types";

  export let imageUrl: string;
  export let title: string;
  export let link: string;
  export let translations: TranslationData = {};

  const siteID = import.meta.env.PUBLIC_SITE_ID;
  const gameUrl = `${
    urlTranslate[siteID as keyof typeof urlTranslate]["game-pages"]
  }/${link}`;

</script>

<div class="flex gap-x-2.5 items-center justify-between">
  <div class="flex items-center gap-x-2.5">
    <div class="w-12 h-12">
      <Image
        {imageUrl}
        imageAlt="{title} logo"
        imageWidth={48}
        imageHeight={48}
        imageClass="rounded-lg w-full h-full"
      />
    </div>
    <div class="line-clamp-2 text-black">{title}</div>
  </div>
  <Link
    href={`${gameUrl}/`}
    classes="flex w-fit h-[37px] justify-center items-center uppercase rounded-md btn-secondary px-4 py-[6px] text-sm font-semibold text-white"
  >
    {translations?.play}
  </Link>
</div>
