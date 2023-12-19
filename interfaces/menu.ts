import type { ImageData } from "./common/types";

export type Menu = {
  data: NavigationItem[];
  meta: ApiResponseMeta;
};

export type MenuItemChild = {
  id: number;
  attributes: {
    title: string;
    url: string;
    order: number;
    images: {
      data: ImageData | null;
    };
    children: {
      data: MenuItemChild[];
    };
  };
};

export type MenuItem = {
  id: number;
  attributes: {
    title: string;
    url: string;
    order: number;
    images: {
      data: ImageData | null;
    };
    children: {
      data: MenuItemChild[];
    };
  };
};

type NavigationItemAttributes = {
  title: string;
  items: {
    data: MenuItem[];
  };
};

type NavigationItem = {
  id: number;
  attributes: NavigationItemAttributes;
};

type ApiResponseMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProcessedMenus = {
  [key: string]: MenuItem[];
};
