<script lang="ts">
  // import { PUBLIC_IMAGE_URL } from '$env/static/public';

  export let imageUrl: string;
  export let imageAlt: string = '';
  export let imageWidth: number;
  export let imageHeight: number;
  export let originalWidth: number = 0;
  export let originalHeight: number = 0;
  export let imageQuality: number = 80;
  export let imageFit: string = 'cover';
  export let imageClass: string = '';
  export let imageResponsive: boolean = true;
  export let imageWatermark: any = null;
  export let fitin: boolean = false;

  let transformed: string = '';
  let lowres: string = '';
  let resizedWidth: number;
  let resizedHeight: number;

  $: {
    if (originalWidth > 0 && imageHeight > 0) {
      resizedWidth = Math.round((originalWidth / originalHeight) * imageHeight);
    }

    if (originalHeight > 0 && imageWidth > 0) {
      resizedHeight = Math.round((originalHeight / originalWidth) * imageWidth);
    }

    if (imageUrl) {
      const basePath = imageUrl.substring(imageUrl.indexOf('.com') + 4);
      const watermark = imageWatermark ? `:watermark${imageWatermark}` : '';
      const quality = `:quality(${imageQuality})`;
      const pathPrefix = `${import.meta.env.PUBLIC_IMAGE_URL}${fitin ? '/fit-in' : ''}`;
      const filters = `${imageWidth}x${imageHeight}/filters${watermark}${quality}`;

      transformed = `${pathPrefix}/${filters}${basePath}`;
      lowres = `${pathPrefix}/${filters}:quality(1)${basePath}`;
    } else {
      transformed = '';
      lowres = '';
    }
  }
</script>

<img
  loading="eager"
  decoding="async"
  data-src={transformed}
  src={lowres || transformed}
  alt={imageAlt}
  width={imageWidth || resizedWidth}
  class="{imageResponsive ? 'img-fluid ' : ''}{imageClass} lazy"
  height={imageHeight || resizedHeight}
/>
