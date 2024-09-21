import { ReactNode, createContext, useState } from "react";
import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ProductService from "../services/product.service";
import { useLoading } from "../hook/useLoading";


interface Props {
  children: ReactNode
}

type ProductContext = {
  products: ProductListResponseInterface | null
  getProducts: (page: number, sortBy: keyof Product, sortOrder: string) => void
  getProductsWithUrl: (url: string) => void
}

export const ProductContext = createContext({} as ProductContext)

const ProductProvider = ({ children }: Props) => {
  const [products, _setProducts] = useState<ProductListResponseInterface | null>(null)
  const { setLoading } = useLoading()

  const setProducts = (product: ProductListResponseInterface | null) => {
    _setProducts(product)
  }

  const getProducts = async (page: number = 1, sortBy: keyof Product = 'id', sortOrder: string = 'asc') => {
    setLoading(true)
    const response = await ProductService.getProducts(page, sortBy, sortOrder)
    setData(response)
    setLoading(false)
  }

  const getProductsWithUrl = async (url: string) => {
    setLoading(true)
    const response = await ProductService.getProductsWihUrl(url)
    setData(response)
    setLoading(false)
  }

  const setData = (data: ProductListResponseInterface) => {
    setProducts(data)
  }


  return (
    <ProductContext.Provider value={{
      products,
      getProducts,
      getProductsWithUrl
    }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider