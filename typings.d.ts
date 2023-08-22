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
  id: string;
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

export interface Order {
  id: string;
  createdAt: string;
  price: number;
  products: any;
  status: string;
  intent_id?: string;
  user: any;
  userEmail: string;
}

export interface CartItem {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
}

export type ActionTypes = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};
