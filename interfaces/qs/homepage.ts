import type { ImageField } from "../common/types";

export type HomepageQueryOptions = {
  fields: string[];
  populate: {
    blocks: {
      populate: BlockPopulate;
    };
    seo: {
      fields: string[];
    };
  };
};

type ProviderPopulate = {
  fields: string[];
  populate: {
    images: ImageField;
  };
};

type CasinoFields = {
  fields: string[];
  populate: {
    images: ImageField;
    providers: ProviderPopulate;
    bonusSection: boolean;
    casinoBonus: boolean;
    termsAndConditions: boolean;
    noDepositSection: boolean;
    freeSpinsSection: boolean;
  };
};

type BlockPopulate = {
  content: boolean;
  link: boolean;
  image: ImageField;
  casinos: CasinoFields;
  providers: {
    populate: {
      slotProvider: ProviderPopulate;
    };
  };
  providersList: {
    populate: {
      images: ImageField;
      providers: ProviderPopulate;
    };
  };
};