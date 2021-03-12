export interface IProduct {
  id: number;
  price: number;
  title: string;
  image_url: string;
}

export type CartValueType = { price: number; qty: number };

export type CartType = {
  [key: number]: CartValueType;
};
