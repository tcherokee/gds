import type { Block, DynamicComponent } from "../interfaces/common/types";

export const mapBlocksToDynamicComponents = (
  blocks: Block[]
): DynamicComponent[] => {
  return blocks
    .map((block: Block): DynamicComponent | undefined => {
      switch (block.__component) {
        case "shared.introduction-with-image":
          return {
            location: "general",
            name: "introWithImage",
            extension: "astro",
          };
        case "homepage.home-blog-list":
          return {
            location: "blocks",
            name: "blogListBlock",
            extension: "astro",
          };
        case "homepage.home-game-list":
          return {
            location: "blocks",
            name: "gameListBlock",
            extension: "astro",
          };
        case "games.new-and-loved-slots":
          return {
            location: "games",
            name: "newPopularWidget",
            extension: "astro",
          };
        case "games.games-carousel":
          return {
            location: "blocks",
            name: "gameListBlock",
            extension: "svelte",
          };
        case "shared.single-content":
          return {
            location: "blocks",
            name: "contentBlock",
            extension: "astro",
          };
        case "homepage.home-casino-list":
          return {
            location: "blocks",
            name: "casinoListBlock",
            extension: "astro",
          };
        case "casinos.casinos-comparison":
          return {
            location: "casino",
            name: "casinoComparison",
            extension: "astro",
          };
        case "casinos.casino-list":
          if (block.showCasinoFilters !== true) {
            return {
              location: "blocks",
              name: "casinoListBlock",
              extension: "astro",
            };
          } else {
            return {
              location: "casino",
              name: "casinoTable",
              extension: "svelte",
            };
          }
        case "shared.quicklinks":
          return {
            location: "helpers",
            name: "quicklinks",
            extension: "astro",
          };
        case "shared.faqs":
          return {
            location: "blocks",
            name: "faqListBlock",
            extension: "astro",
          };
        case "shared.image-carousel":
          return {
            location: "general",
            name: "imageCarousel",
            extension: "svelte",
          };
        case "shared.image-with-paragraph":
          return {
            location: "blocks",
            name: "imageWithParagraphBlock",
            extension: "astro",
          };
        case "shared.medium-image-with-content":
          return {
            location: "blocks",
            name: "imageWithContentBlock",
            extension: "astro",
          };
        case "shared.pros-and-cons":
          return {
            location: "blocks",
            name: "proConBlock",
            extension: "astro",
          };
        case "shared.how-to-group":
          return {
            location: "blocks",
            name: "howToBlock",
            extension: "astro",
          };
        case "shared.provider-list":
          return {
            location: "games",
            name: "gameProviders",
            extension: "astro",
          };
        case "casinos.casino-live-video":
          return {
            location: "casino",
            name: "casinoVideo",
            extension: "astro",
          };
        case "games.live-stats":
          return {
            location: "games",
            name: "liveStats",
            extension: "svelte",
          };
        case "shared.iframe":
          return {
            location: "general",
            name: "iframe",
            extension: "astro",
          };
        default:
          return undefined;
      }
    })
    .filter(
      (component): component is DynamicComponent => component !== undefined
    );
};

export const loadComponents = async (
  componentsArray: DynamicComponent[]
): Promise<any[]> => {
  const components = await Promise.all(
    componentsArray.map(async (entry) => {
      if (entry.extension === "astro") {
        // Handle Astro components
        // Depending on how Astro handles dynamic imports, this might need to be adjusted.
        const component = await import(
          `../src/components/${entry.location}/${entry.name}.astro`
        );
        return component.default || component;
      } else if (entry.extension === "svelte") {
        // Handle Svelte components
        const component = await import(
          `../src/components/${entry.location}/${entry.name}.svelte`
        );
        return component.default || component;
      }
      return null;
    })
  );

  return components.filter((component) => component !== null);
};
