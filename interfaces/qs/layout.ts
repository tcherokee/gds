// types.ts
import type {
  BreadCrumbField,
  CasinoAttributes,
  CasinoData,
  ImageField,
} from "../common/types";

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
    // countries: {
    //   fields: string[];
    // };
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
    adPopup: {
      fields: string[];
      populate: {
        casinos: {
          populate: {
            noDepositSection: {
              fields: string[];
            };
            freeSpinsSection: {
              fields: string[];
            };
            bonusSection: {
              fields: string[];
            };
            casinoBonus: boolean;
            termsAndConditions: boolean;
            images: {
              fields: string[];
            };
            providers: {
              populate: {
                images: {
                  fields: string[];
                };
              };
            };
          };
        };
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

export type CountryQueryOptions = {
  fields: string[];
};

export type TranslationsQueryOptions = {
  populate: {
    translation: string;
  };
};

export type CountriesQueryOptions = {
  fields: string[];
};
