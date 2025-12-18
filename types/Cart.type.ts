import { Product } from "./Product";
import { Shop } from "./Shop.type";
import { Status } from "./Status.type";

export interface CartItem {
  id: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
  subtotal?: number;
  status: Status;
  product: Product;
  shop:Shop
}

export interface CartGroup {
  shop:Shop;
  items: CartItem[];
  subtotal:number;
}

export interface Cart {
  id?:number;
  productId?:number;
  cartId: number;
  items?: CartItem[];
  grandTotal?: number;
  groups:CartGroup[]
}

