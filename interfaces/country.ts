export type Country = {
  data: CountryDataItem;
};

type Attributes = {
  countryName: string;
  shortCode: string;
};

export type CountryDataItem = {
  id: number;
  attributes: Attributes;
};
