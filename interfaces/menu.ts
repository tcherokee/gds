export default interface Menu {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  title: string;
  items: Items;
}

interface Items {
  data: ItemData[];
}

interface ItemData {
  id: number;
  attributes: ItemAttributes;
}

interface ItemAttributes {
  title: string;
  url: string;
  order: number;
  images: Images;
  children: Children;
}

interface Images {
  data: ImageData | null;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ImageAttributes {
  url: string;
}

interface Children {
  data: ChildData[];
}

interface ChildData {
  id: number;
  attributes: ChildAttributes;
}

interface ChildAttributes {
  title: string;
  url: string;
  order: number;
  images: Images;
  children: Children;
}

interface Meta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
