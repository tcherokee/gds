import type { ImageData, ImageInfo, IntroductionWithImageBlock, SingleContentBlock, FaqBlockTypes, HowToBlockTypes, Seo, Block} from "./types.ts"
import type { LayoutData } from "../layout";
import type { NavigationItem } from "../menu.ts";
import type { CustomPageItem } from "../custom-pages"

// Main Layout Page TypeGuard
export const isMainLayoutData = (data: any): data is LayoutData => {
  return (
    data !== null &&
    typeof data === "object" &&
    typeof data.id === "number" &&
    data.attributes !== undefined &&
    typeof data.attributes.legalText === "string" &&
    typeof data.attributes.footerContent === "string"
  );
};

export const isCustomPage= (data: any): data is CustomPageItem[] =>
  Array.isArray(data) &&
  data.every(
    (item) =>
      typeof item.id === "number" &&
      typeof item.attributes === "object" &&
      typeof item.attributes.title === "string" &&
      typeof item.attributes.urlPath === "string" &&
      typeof item.attributes.createdAt === "string" &&
      typeof item.attributes.updatedAt === "string"
      
  );

// Menu Navigation Item Typeguard
export const isNavigationItemArray = (data: any): data is NavigationItem[] => {
  
  const isMenuItem = (item: any): item is NavigationItem =>
    item &&
    typeof item.id === "number" &&
    item.attributes &&
    typeof item.attributes.title === "string" &&
    (!item.attributes.images ||
      item.attributes.images.data === null ||
      isImageData(item.attributes.images.data)) &&
    Array.isArray(item.attributes.children.data) &&
    item.attributes.children.data.every(isMenuItem);

  return (
    Array.isArray(data) &&
    data.every(
      (menuItem) =>
        menuItem &&
        typeof menuItem.id === "number" &&
        menuItem.attributes &&
        typeof menuItem.attributes.title === "string" &&
        Array.isArray(menuItem.attributes.items.data) &&
        menuItem.attributes.items.data.every(isMenuItem)
    )
  );
};

// Block Gauards
export const isSingleContentBlock = (block: Block): block is SingleContentBlock => {
  return block.__component === "shared.single-content";
}

export const isIntroductionWithImageBlock = (
  block: Block
): block is IntroductionWithImageBlock => {
  return block.__component === "shared.introduction-with-image";
}

export const isFaqBlockType = (block: Block): block is FaqBlockTypes => {
  return block.__component === "shared.faqs"
}

export const isHowToBlockType = (block: Block): block is HowToBlockTypes => {
  return block.__component === "shared.how-to-group"
}

export const isCasinoListType = (block: Block): block is HowToBlockTypes => {
  return block.__component === "casinos.casino-list";
};

export const isImageWithParagraphType = (block: Block): block is HowToBlockTypes => {
  return block.__component === "shared.image-with-paragraph";
};

export const isProsAndConsType = (block: Block): block is HowToBlockTypes => {
  return block.__component === "shared.pros-and-cons";
};

// General TypeGuard Functions
const isImageInfo = (obj: any): obj is ImageInfo =>
    obj != null &&
    typeof obj === 'object' &&
    obj.hasOwnProperty('data') &&
    isImageData(obj.data);

const isImageData = (obj: any): obj is ImageData =>
    obj != null &&
    typeof obj === 'object' &&
    typeof obj.id === 'number' &&
    obj.hasOwnProperty('attributes') &&
    typeof obj.attributes === 'object' &&
    typeof obj.attributes.url === 'string';
