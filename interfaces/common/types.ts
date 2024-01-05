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

export type IDAttribute = {
  id: number;
};

export type UpdateAttribute = {
  updatedAt: string;
};

export type ImageAttribute = {
  id: number;
  attributes: {
    url: string;
  };
};

export type ImageInfo = {
  data: ImageAttribute;
};

export type LinkAttribute = {
  id: number;
  label: string;
  url: string;
};

export type BlockBase = IDAttribute & {
  __component: string;
};

export type ProviderAttribute = {
  title: string;
  slug?: string;
  images: ImageInfo;
};

export type ProviderData = {
  data: IDAttribute & {
    attributes: ProviderAttribute;
  };
};

export type GameProvider = {
  id: number;
  slotProvider: ProviderData;
};

export type BonusSection = IDAttribute & {
  bonusAmount: number;
  availability: string;
  speed: string;
  termsConditions: string;
  cashBack: string | null;
  freeSpin: string | null;
};

export type CasinoBonus = {
  id: number;
  bonusLabel: string;
  bonusCode: string | null;
  bonusUrl: string;
};

export type TermsAndConditions = {
  id: number;
  heading: string;
  copy: string;
  gambleResponsibly: string;
};

export type CasinoGeneralInfo = {
  regulationLicense: string;
  telephone: string;
  email: string;
  societa: string;
  website: string;
};

export type CasinoAttributes = {
  title: string;
  slug: string;
  ratingAvg: number;
  ratingCount: number;
  publishedAt: string;
  Badges?: string | null;
  images: ImageInfo;
  providers: {
    data: ProviderData[];
  };
  bonusSection: BonusSection;
  casinoBonus: CasinoBonus;
  termsAndConditions: TermsAndConditions;
  noDepositSection?: BonusSection;
  freeSpinsSection?: BonusSection;
};

export type CasinoData = {
  id: number;
  attributes: CasinoAttributes;
};

export type BreadCrumbField = {
  fields: string[];
};

export type ImageField = {
  fields: string[];
};

// JSON Responses

export type TranslationData = {
  [key: string]: string;
};

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
    jobTitle: string;
    photo: {
      data: ImageData;
    };
  };
};

export type Category = {
  id: number;
  attributes: {
    title?: string;
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

export type IntroductionWithImageBlock = BlockBase & {
  introduction: string;
  heading: string;
  image: ImageInfo;
};

export type HomeGameListBlock = BlockBase & {
  numberOfGames: number;
  sortBy: string;
  link: LinkAttribute;
  providers: GameProvider[];
};

export type SingleContentBlock = BlockBase & {
  introduction: string;
  heading: string;
  image: ImageInfo;
};

export type HomeCasinoListBlock = BlockBase & {
  link: LinkAttribute;
  casinos: {
    data: CasinoData[];
  };
};

export type BlogBlockTypes = BlockBase & {
  numOfBlogs: number;
  link: LinkAttribute;
};

export type Block =
  | IntroductionWithImageBlock
  | HomeGameListBlock
  | SingleContentBlock
  | HomeCasinoListBlock
  | BlogBlockTypes;

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

// Components
export type ComponentLink = {
  text?: string;
  html?: HTMLElement;
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
    height?: number;
    width?: number;
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

export type SortStore = {
  [key: string]: string; // This allows any string to be used as a key
  Newest: string;
  "Most Popular": string;
  "Top Rated": string;
  "Top Rated Author": string;
  "Top Rated Users": string;
  "Most Viewed": string;
};

export type FilterStore = {
  [key: string]: string; // This allows any string to be used as a key
  "Free Spins": string;
  "No Deposit": string;
  Playthrough: string;
};
