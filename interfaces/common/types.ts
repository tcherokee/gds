// API Responses and Fetch Function

export type ApiResponse<T> = {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>; // or a more specific type if you know the structure of 'meta'
};

export type FetchApiParams = {
  endpoint: string;
  query?: string;
  wrappedByKey?: string;
  wrappedByList?: boolean;
};

// QS Fields
export type BreadCrumbField = {
  fields: string[];
};

export type ImageField = {
  fields: string[];
};

// JSON Responses
export type BreadcrumbData = {
  id: number;
  breadCrumbText: string;
  breadCrumbUrl?: string;
};

export type Seo = {
  id: number;
  metaTitle: string;
  metaDescription: string;
};

export type Author = {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
    photo: {
      data: ImageData;
    };
  };
};

export type Category = {
  id: number;
  attributes: {
    title: string;
    slug?: string;
  };
};

export type Provider = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    images: {
      data: ImageData;
    };
  };
};

export type Link = {
  id: number;
  label: string;
  url: string;
};

export type ImageData = {
  id: number;
  attributes: {
    url: string;
    width?: number;
    height?: number;
  };
};

export type Casino = {
  id: number;
  attributes: {
    slug: string;
    title: string;
    logoIcon: {
      data: ImageData;
    };
    freeSpinsSection?: {
      id: number;
      bonusAmount: number;
      availability: string;
      speed: string;
      termsConditions: string;
      cashBack?: any;
      freeSpin?: any;
    };
  };
};

export type Block =
  | IntroductionWithImageBlock
  | HomeGameListBlock
  | SingleContentBlock
  | HomeCasinoListBlock;
// ... other block types

type IntroductionWithImageBlock = {
  id: number;
  __component: "shared.introduction-with-image";
  introduction: string;
  heading: string;
  image: ImageData;
};

type HomeGameListBlock = {
  id: number;
  __component: "homepage.home-game-list";
  numberOfGames: number;
  sortBy: string;
  link: Link;
  providers: Provider[];
};

type SingleContentBlock = {
  id: number;
  __component: "shared.single-content";
  content: string;
};

type HomeCasinoListBlock = {
  // Define the structure similar to the above blocks
};

// Components
export type ComponentLink = {
  text: string;
  href: string;
  image?: {
    src: string;
    originalHeight?: number;
    originalWidth?: number;
    imageWidth: number;
    imageHeight: number;
    alt: string;
    classes?: string;
  };
  icon?: {
    name: string;
    side: "left" | "right";
  };
  isFilled?: boolean;
  classes?: string;
};

// Randoms
export type DynamicComponent = {
  location: string;
  name: string;
  extension: "astro" | "svelte";
};
