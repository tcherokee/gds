export default function useTransformImage(
  imageUrl: string,
  imageWidth: number,
  imageHeight: number,
  imageAlt: string,
  imageQuality = 70,
  imageFit = "cover",
  imageClass = "",
  imageResponsive = true
) {
  let transformed;

  let filters = `/fit-in/filters:quality(${imageQuality})/${imageWidth}x${imageHeight}`;

  if (imageUrl) {
    transformed =
      `https://d1ekh99p753u3m.cloudfront.net${filters}` +
      imageUrl.substring(imageUrl.indexOf(".com") + 4);
  } else {
    transformed = null;
  }

  return `<img loading="lazy" decoding="async" src=${transformed} alt=${imageAlt} width=${
    imageWidth === 0 ? "auto" : imageWidth
  } class=${(imageResponsive && "img-fluid ") + imageClass} height=${
    imageHeight === 0 ? "auto" : imageHeight
  } style:object-fit=${
    typeof imageFit === "undefined" ? imageFit : "cover"
  } />`;
}
