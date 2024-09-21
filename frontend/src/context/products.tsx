import { ReactNode, createContext, useEffect, useState } from "react";
import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ProductService from "../services/product.service";
import { useLoading } from "../hook/useLoading";


interface Props {
  children: ReactNode
}

type ProductContext = {
  products: ProductListResponseInterface | null
  getProducts: (page: number) => void
  getProductsWithUrl: (url: string) => void
  productsPerPage: number
  setProductsPerPage: (number: number) => void
  sortBy: keyof Product
  setSortBy: (id: keyof Product) => void
  sortOrder: string
  setSortOrder: (id: string) => void
}

export const ProductContext = createContext({} as ProductContext)

const ProductProvider = ({ children }: Props) => {
  const [products, _setProducts] = useState<ProductListResponseInterface | null>(null)
  const [productsPerPage, _setProductsPerPage] = useState<number>(15)
  const [sortBy, _setSortBy] = useState<keyof Product>('id');
  const [sortOrder, _setSortOrder] = useState<string>('asc');
  const { setLoading } = useLoading()

  useEffect(() => {
    if (products) {
      getProductsWithUrl(`${products.first_page_url}&per_page=${productsPerPage}`);
    }
  }, [productsPerPage]); // eslint-disable-line

  useEffect(() => {
    console.log('aaa')
    if(products) getProducts(products?.current_page)
  },[sortBy, sortOrder]) // eslint-disable-line
  

  const setProducts = (product: ProductListResponseInterface | null) => {
    _setProducts(product)
  }

  const setProductsPerPage = (number: number) => {
    if (!products) return;
  
    const maxProducts = products.total || 0;
  
    if (number < 0) {
      _setProductsPerPage(0);
    } else if (number > maxProducts) {
      _setProductsPerPage(maxProducts);
    } else {
      _setProductsPerPage(number);
    }
  };

  const getProducts = async (page: number = 1) => {
    setLoading(true)
    console.log(page, sortBy, sortOrder, productsPerPage)
    const response = await ProductService.getProducts(page, sortBy, sortOrder, productsPerPage)
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

  const setSortBy = (id: keyof Product) => {
    _setSortBy(id)
  }

  const setSortOrder = (op: string) => {
    _setSortOrder(op)
  }


  return (
    <ProductContext.Provider value={{
      products,
      getProducts,
      getProductsWithUrl,
      productsPerPage,
      setProductsPerPage,
      sortBy,
      setSortBy,
      sortOrder,
      setSortOrder
    }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider