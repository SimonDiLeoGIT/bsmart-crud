import { CategoryInterface } from "./Category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryInterface;
}

export interface ProductListResponseInterface {
  current_page: number;
  data: ProductCategory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface link {
  url: string | null;
  label: string;
  active: boolean;
}