import { Pagination } from "./Api.type";
import { CartItem } from "./Cart.type";

export type Order = {
    id:number;
    code:string;
    paymentStatus:string;
    address:string;
    totalAmount:number;
    createdAt:string;
    items:CartItem[];
}


export interface OrderResponse {
  orders: Order[];
  pagination: Pagination;
}


export interface GroupedOrder {
  orderId: number;
  invoiceId: string;
  orderDate: string;
  paymentStatus: string;
  statusOrder:string;
  totalPayment: number;
  storeName: string;
  shopId: number;
  products: CartItem[];
}
