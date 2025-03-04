// API Responses and Fetch Function

import type GameListBlock from "../../src/components/blocks/gameListBlock.svelte";
import type { Country } from "../country";

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
  isPaginated?: boolean;
};

// QS Fields

export type IDAttribute = {
  id: number;
};

export type UpdateAttribute = {
  updatedAt: string;
};

export type ImageData = {
  id: number;
  attributes: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    alternativeText?: string;
  };
};

export type ImageInfo = {
  data: ImageData;
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
  title?: string;
  slug?: string;
  images?: ImageInfo;
};

export type TProviderAttributesOnly = IDAttribute & {
  attributes: ProviderAttribute;
};

export type ProviderData = {
  data: {
    id?: number;
    attributes: ProviderAttribute;
  };
};

export type ProviderTestimony = {
  title: string;
  testimony: string;
  testifierName: string;
  testifierTitle: string;
  providers: ProviderData;
};

export type GameProvider = {
  id?: number;
  slotProvider: ProviderData;
};

export type CategoryAttributes = {
  title?: string;
  slug: string;
  images?: ImageInfo;
};

export type Category = {
  id: number;
  attributes: CategoryAttributes;
};

export type CategoryData = {
  data: {
    id?: number;
    attributes: CategoryAttributes;
  };
};

export type GameCategory = {
  id?: number;
  slotCategories: CategoryData;
};

export type HomeGameListBlock = BlockBase & {
  numberOfGames: number;
  sortBy: string;
  link: LinkAttribute;
  providers: GameProvider[];
  categories: GameCategory[];
  gameListTitle: string;
};

export type CustomGameList = {
  numberOfGames: number;
  sortBy: string;
  gameProviders: GameProvider[];
  gameCategories: GameCategory[];
  showGameFilterPanel: boolean;
  showGameMoreButton: boolean;
};

export type AuthorBonusSection = {
  bonusAmount: number;
  availability: string;
  speed: string;
  termsConditions: string;
  cashBack: string | null;
  freeSpin: string | null;
};

export type BonusSection = IDAttribute & AuthorBonusSection;

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

export type BonusSectionOnly = {
  bonusSection: BonusSection;
  noDepositSection?: BonusSection;
  freeSpinsSection?: BonusSection;
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
  casinoGeneralInfo?: {
    id: number;
    wageringRequirements: number;
  };
  countries: Country;
};

export type AuthorCasinoAttributes = {
  title: string;
  slug: string;
  ratingAvg: number;
  ratingCount: number;
  publishedAt: string;
  Badges?: string | null;
  images: {
    id: number;
    url: string;
  };
  provider: {
    title: string;
    slug?: string;
    images: {
      id: number;
      url: string;
    };
  };
  bonusSection: AuthorBonusSection;
  casinoBonus: {
    id: number;
    bonusUrl: string;
    bonusLabel: string;
    bonusCode: string;
  };
  termsAndConditions: {
    id: number;
    copy: string;
    gambleResponsibly: string;
  };
  noDepositSection?: AuthorBonusSection;
  freeSpinsSection?: AuthorBonusSection;
};

export type AuthorSportAttributes = {
  title: string;
  slug: string;
  ratingAvg: number;
  ratingCount: number;
  publishedAt: string;
  Badges?: string | null;
  images: {
    id: number;
    url: string;
  };
  provider: {
    title: string;
    slug?: string;
    images: {
      id: number;
      url: string;
    };
  };
  bonusSection: AuthorBonusSection;
  sportBonus: {
    id: number;
    bonusUrl: string;
    bonusLabel: string;
    bonusCode: string;
  };
  termsAndConditions: {
    id: number;
    copy: string;
    gambleResponsibly: string;
  };
  noDepositSection?: AuthorBonusSection;
  freeSpinsSection?: AuthorBonusSection;
};

export type CasinoData = {
  id: number;
  attributes: CasinoAttributes;
};

export type SportData = {
  id: number;
  attributes: SportAttributes;
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
  id?: number;
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

export type Link = {
  id: number;
  label: string;
  url: string;
};

export type IntroductionWithImage = {
  id: number;
  introduction: string;
  heading: string;
  image: ImageInfo;
};

export type IntroductionWithImageBlock = BlockBase & {
  introduction: string;
  heading: string;
  image: ImageInfo;
};

export type TournamentTableBlock = BlockBase & {
  id: number;
  __component: string;
  tournamentTableOptions?: string;
};

export type SlideBtn = {
  btnText: string;
  btnLink: string;
  btnType: string;
};

export type IntroWithSlides = {
  introduction: string;
  heading: string;
  neaderType: string;
  image: ImageInfo;
  showBtn: boolean;
  btnText: string;
  btnLink: string;
  btnType: string;
};

export type IntroductionWithSliderBlock = BlockBase & {
  introWithSlides: IntroWithSlides;
};

export type SingleContentBlock = BlockBase & {
  content: string;
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

export type CasinoComparison = {
  id: number;
  casino: {
    data: CasinoData;
  };
};

export type SportComparison = {
  id: number;
  sport: {
    data: SportData;
  };
};

export type CasinoComparisonBlock = BlockBase & {
  casinos: CasinoComparison[];
};

export type CasinoListData = {
  id: number;
  casino: {
    data: CasinoData[];
  };
};

export type SportListData = {
  id: number;
  sport: {
    data: SportData[];
  };
};

export type Faqs = {
  id: number;
  question: string;
  answer: string;
};

export type FaqBlockTypes = BlockBase & {
  question: string;
  answer: string;
};

export type HowToBlockTypes = BlockBase & {
  title: string;
  description: string;
};

export type HowToGroup = {
  id: number;
  title: string;
  description: string;
  howToGroup: HowTo[];
};

export type HowTo = {
  id: number;
  heading: string;
  copy: string;
  image: ImageInfo;
};

export type ProsCons = {
  id: number;
  list: string;
};

export type imageWithParagraph = {
  id: number;
  heading: string;
  copy: string;
  image: ImageInfo;
};

export type ProsAndConsTypes = BlockBase & {
  heading: string;
  pros: ProsCons[];
  cons: ProsCons[];
};

export type ImageWithParagraphTypes = BlockBase & {
  title: string;
  imageWithParagraph: imageWithParagraph[];
};

export type CasinoFeatures = {
  id: number;
  feature: string;
};

export type CasinoListBlock = BlockBase & {
  casinoSort: string;
  casinoFilters: string;
  showCasinoFilters: boolean;
  showLoadMore: boolean;
  numberPerLoadMore: number;
  casinosList: CasinoListData[];
  showCasinoTableHeader: boolean;
};

export type SportListBlock = BlockBase & {
  sportSort: string;
  sportFilters: string;
  showSportFilters: boolean;
  showLoadMore: boolean;
  numberPerLoadMore: number;
  sportsList: SportListData[];
  showSportTableHeader: boolean;
};

export type TGameListBlock = BlockBase & CustomGameList;

export type Block =
  | IntroductionWithImageBlock
  | IntroductionWithSliderBlock
  | CasinoComparisonBlock
  | HomeGameListBlock
  | SingleContentBlock
  | HomeCasinoListBlock
  | CasinoListBlock
  | BlogBlockTypes
  | FaqBlockTypes
  | HowToBlockTypes
  | ImageWithParagraphTypes
  | ProsAndConsTypes
  | TGameListBlock
  | TCasinoLiveVideo
  | TQuickLinks
  | TournamentTableBlock;

export type TQuickLinks = BlockBase & {
  showQuickLinks: boolean;
};

export type TCasinoLiveVideo = BlockBase & {
  playbackUrl: string;
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
    countries: Country;
    [key: string]: any;
  };
};

export type Sport = {
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
    [key: string]: any;
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

export type quicklinksObj = {
  text: string;
  id: string;
};

export type SortStore = {
  [key: string]: string;
};

export type FilterStore = {
  [key: string]: string;
};

export type BadgesStore = string[];

export type CasinoFilters = {
  limit: number | undefined;
  sort: string | undefined;
  providers: string[] | undefined;
  ids: number[];
  bonusKey: string;
  condition: string | undefined;
  amount: string | undefined;
  wagering: string | undefined;
  speed: string | undefined;
  casinoCountry: string | undefined;
  localisation?: boolean;
};

export type SportFilters = {
  limit: number | undefined;
  sort: string | undefined;
  providers: string[] | undefined;
  ids: number[];
  bonusKey: string;
  condition: string | undefined;
  amount: string | undefined;
  wagering: string | undefined;
  speed: string | undefined;
};

export type GameFilters = {
  limit: number | undefined;
  sort: string | undefined;
  page: number | undefined;
  providers: string[];
  categories: string[];
  author?: string;
};

export type GameFiltersQuery = {
  provider?: string[];
  categories?: string[];
};

export type BonusLabelItem = {
  label: string;
  value: string;
};

export type BonusLabels = {
  [key: string]: BonusLabelItem;
};

export type CasinoBlock = {
  id: number;
  __component: string;
  link: Link;
  casinoTableTitle: string;
  casinos: {
    data: [Casino];
  };
};

export type ProsConsBlock = {
  heading: string;
  pros: {
    list: string;
  }[];
  proImage: {
    data: {
      attributes: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  cons: {
    list: string;
  }[];
  conImage: {
    data: {
      attributes: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};

export type Toggles = {
  [key: string]: boolean;
};

export type TRedirects = {
  id: number;
  attributes: {
    redirectUrl: string;
    redirectTarget: string;
    redirectMethod: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type TBreadcrumbs = {
  breadcrumbs: string;
  breadcrumbKey: string;
};

export type SportAttributes = {
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
  sportBonus: CasinoBonus;
  termsAndConditions: TermsAndConditions;
  noDepositSection?: BonusSection;
  freeSpinsSection?: BonusSection;
  sportGeneralInfo?: {
    id: number;
    wageringRequirements: number;
  };
};

export type UserCountry = {
  location: {
    city: string;
    country: string;
    ip: string;
    loc: string;
    org: string;
    region: string;
    timezone: string;
  };
  ip: string;
};
