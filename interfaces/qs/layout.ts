// types.ts
import type { BreadCrumbField, ImageField } from "../common/types";

type CasinoField = {
  fields: string[];
  populate: {
    logoIcon: ImageField;
    bonusSection?: boolean;
    noDepositSection?: boolean;
    freeSpinsSection?: boolean;
  };
};

export type LayoutQueryOptions = {
  fields: string[];
  populate: {
    footerImages: {
      fields: string[];
      populate: {
        image: ImageField;
      };
    };
    Logo: ImageField;
    homeBreadcrumbs: BreadCrumbField;
    gamesBreadcrumbs: BreadCrumbField;
    casinoBreadcrumbs: BreadCrumbField;
    blogBreadcrumbs: BreadCrumbField;
    slotCasinosBreadcrumbs: BreadCrumbField;
    providersBreadcrumbs: BreadCrumbField;
    categoriesBreadcrumbs: BreadCrumbField;
    casinoProvidersBreadcrumbs: BreadCrumbField;
    most_loved_casinos: CasinoField;
    no_deposit_casinos: CasinoField;
    free_spin_casinos: CasinoField;
    backgroundImage: ImageField;
    plus18Popup: {
      fields: string[];
      populate: {
        image: ImageField;
      };
    };
  };
};

type MenuItemPopulate = {
  fields: string[];
  populate: {
    images: ImageField;
    children: {
      fields: string[];
    };
  };
};

export type MenuQueryOptions = {
  fields: string[];
  populate: {
    items: MenuItemPopulate;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
};

export type TranslationsQueryOptions = {
  populate: {
    translation: string;
  };
};
