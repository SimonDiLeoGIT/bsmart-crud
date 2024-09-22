import { Product } from "./ProductInterfaces"

export interface CategoryInterface {
  id?: number
  name: string
  description: string
}

export interface CategoryProductsInterface {
  id: number
  name: string
  description: string
  products: Product[]
}