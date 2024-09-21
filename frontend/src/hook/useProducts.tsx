import { useContext } from "react";
import { ProductContext } from "../context/products";

export const useProducts = () => {
  const context = useContext(ProductContext)

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context
}