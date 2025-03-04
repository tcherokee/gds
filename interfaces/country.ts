import type { ImageInfo } from "./common/types";

export type Country = {
  data: CountryDataItem[];
};

type Attributes = {
  countryName: string;
  shortCode: string;
  countryFlag: ImageInfo;
};

export type CountryDataItem = {
  id: number;
  attributes: Attributes;
};
