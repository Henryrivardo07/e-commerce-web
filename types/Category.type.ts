import { Pagination } from "./Api.type";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: Pagination;
}