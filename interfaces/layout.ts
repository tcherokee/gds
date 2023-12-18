export default interface Layout {
  data: Data;
  meta: Meta;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  legalText: string;
  footerContent: string;
  gameInfoText: string;
  cookiesHeaderText: string;
  cookiesDescription: string;
  cookiesUrl: string;
  cookiesLinkText: string;
  footerImages: FooterImage[];
  Logo: Logo;
  homeBreadcrumbs: Breadcrumb[];
  gamesBreadcrumbs: Breadcrumb[];
  casinoBreadcrumbs: Breadcrumb[];
  blogBreadcrumbs: Breadcrumb[];
  slotCasinosBreadcrumbs: Breadcrumb[];
  providersBreadcrumbs: Breadcrumb[];
  categoriesBreadcrumbs: Breadcrumb[];
  casinoProvidersBreadcrumbs: Breadcrumb[];
  filterProviders: FilterProviders;
  most_loved_casinos: MostLovedCasinos;
  no_deposit_casinos: NoDepositCasinos;
  free_spin_casinos: FreeSpinCasinos;
  backgroundImage: BackgroundImage;
}

interface FooterImage {
  id: number;
  imageName: string;
  imageLink: string | null;
  image: ImageData;
}

interface ImageData {
  data: ImageAttributes;
}

interface ImageAttributes {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
  };
}

interface Logo {
  data: ImageAttributes;
}

interface Breadcrumb {
  id: number;
  breadCrumbText: string;
  breadCrumbUrl: string | null;
}

interface FilterProviders {
  data: Provider[];
}

interface Provider {
  id: number;
  attributes: ProviderAttributes;
}

interface ProviderAttributes {
  slug: string;
  images: ImageData;
}

interface MostLovedCasinos {
  data: any[]; // Define the structure if needed
}

interface NoDepositCasinos {
  data: any[]; // Define the structure if needed
}

interface FreeSpinCasinos {
  data: FreeSpinCasino[];
}

interface FreeSpinCasino {
  id: number;
  attributes: FreeSpinCasinoAttributes;
}

interface FreeSpinCasinoAttributes {
  slug: string;
  title: string;
  logoIcon: ImageData;
  freeSpinsSection: FreeSpinsSection;
}

interface FreeSpinsSection {
  id: number;
  bonusAmount: number;
  availability: string;
  speed: string;
  termsConditions: string;
  cashBack: null | string; // Adjust the type as needed
  freeSpin: null | string; // Adjust the type as needed
}

interface BackgroundImage {
  data: ImageAttributes;
}

interface Meta {
  // Define the structure of Meta if needed
}
