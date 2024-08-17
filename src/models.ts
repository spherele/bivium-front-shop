export type Gender = 'male' | 'female';

export interface IUser {
  name: string | null;
  surname: string | null;
  patronymic: string | null;
  gender: Gender | null;
  phonenumber: string | null;
  email: string;
  birthday: string;
  isAuthorized: boolean;
  token: string;
}

export interface IProduct {
  id: number;
  name: string;
  gender: string;
  season: string;
  sportType: string;
  color: string;
  inStock: boolean;
  sizes: {
    id: number;
    price: number;
    inStock: boolean;
    size: string;
  }[];
  images: string[];
  description: string;
  views: number;
  categoryId: number;
  isAmbassadors: boolean;
}

export interface ICatalogProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
  views: number;
  uploadedAt: 1720006392;
  sizes: {
    id: number;
    size: string;
    inStock: true;
  }[];
}

export interface IProductCard {
  id: number;
  image: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface INewsItemList {
  id: number;
  name: string;
  date: number;
  description: string;
  image: string;
}

export interface IOrder {
  items: {
    color: string;
    image: string;
    inStock: boolean;
    name: string;
    price: number;
    productId: number;
    quantity: number;
    size: string;
  }[];
  totalPrice: string;
  orderId: string;
  date: number;
  receiptUrl: string | null;
  trackUrl: string | null;
}
