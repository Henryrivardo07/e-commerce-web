import { Pagination } from "./Api.type";
import { Category } from "./Category.type";
import { Shop } from "./Shop.type";

export interface Product {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  categoryId: number;
  category: Category;
  shopId: number;
  shop: Shop;
  createdAt?:string;
  updatedAt?:string;
}

export interface ProductListResponse {
  products: Product[];
  pagination: Pagination;
}



