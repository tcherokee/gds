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

export type NavigationItem = {
  id: number;
  attributes: NavigationItemAttributes;
};

export type MainNavigationItem = {
  id: number;
  attributes: {
    mainNavigation: MainNavItem[];
    footerNavigation: MainNavItem[];
    footerNavigations: MainNavItem[];
    subNavigation: MainNavItem[];
  };
};

export type MainNavItem = {
  id: number;
  title: string;
  url: string;
  images: {
    data: ImageData | null;
  };
  subMenu: {
    id: number;
    title: string;
    url: string;
  }[];
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
