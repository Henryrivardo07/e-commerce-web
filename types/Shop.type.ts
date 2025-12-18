import { Pagination } from "./Api.type";
import { Product } from "./Product";

export interface Shop {
  id: number;
  name: string;
  slug?: string;
  logo?: string | null;
  address?:string;
  isActive?:boolean;
  createdAt:string;
  _count: {
    products?:number;
    orderItems?:number;
    totalOrders?:number;
    totalRevenue?:number;
    completedItems?:number;
    hasShop:boolean
   }
}

export interface ShopProductsResponse {
  shop:Shop,
  products: Product[];
  pagination: Pagination;
}