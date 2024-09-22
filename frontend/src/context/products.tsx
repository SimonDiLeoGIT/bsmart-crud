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
  name: string
  setName: (name: string) => void
}

export const ProductContext = createContext({} as ProductContext)

const ProductProvider = ({ children }: Props) => {
  const [products, _setProducts] = useState<ProductListResponseInterface | null>(null)
  const [productsPerPage, _setProductsPerPage] = useState<number>(15)
  const [sortBy, _setSortBy] = useState<keyof Product>('id');
  const [sortOrder, _setSortOrder] = useState<string>('asc');
  const [name, _setName] = useState<string>('')
  const { setLoading } = useLoading()

  useEffect(() => {
    if (products) {
      getProductsWithUrl(`${products.first_page_url}&per_page=${productsPerPage}${name !== '' ? `&name=${name}` : ''}`);
    }
  }, [productsPerPage, name]); // eslint-disable-line

  useEffect(() => {
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
    const response = await ProductService.getProducts(page, sortBy, sortOrder, productsPerPage, name)
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

  const setName = (n: string) => {
    _setName(n)
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
      setSortOrder,
      name,
      setName
    }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider