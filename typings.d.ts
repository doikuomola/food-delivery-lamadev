export interface MenuLink {
  id: number;
  title: string;
  url: string;
}

export interface Slide {
  id: number;
  title: string;
  image: string;
}

export type Menu = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
};

export type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

export interface PriceProp {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
}
