import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { ProductCategory } from "../interfaces/ProductInterfaces"
import Pagination from "../utils/Pagination"
import { PaginationInterface } from "../interfaces/Pagination"
import { Link } from "react-router-dom"
import Loading from "./Loading"

const Products = () => {

  const [products , setProducts] = useState<ProductCategory[]>()
  const [paginationData, setPaginationData] = useState<PaginationInterface>()
  
  useEffect(() => {
    getProducts(1)
  }, [])
  
  const getProducts = async (page: number = 1) => {
    const response = await ProductService.getProducts(page)
    setProducts(response.data)
    setPaginationData(
      {
        current_page: response.current_page,
        first_page_url: response.first_page_url,
        from: response.from,
        last_page: response.last_page,
        last_page_url: response.last_page_url,
        next_page_url: response.next_page_url,
        path: response.path,
        per_page: response.per_page,
        prev_page_url: response.prev_page_url,
        to: response.to,
        total: response.total
      }
    )
  }

  return (
    <>
      {
        !products &&
        <div className="fixed top-1/3 w-screen left-0 flex justify-center items-center">
          <Loading />
        </div>
      } 
      <ul className="mt-4 shadow-lg shadow-slate-400">
        <li className="grid grid-cols-5 border-b-2 border-slate-700 p-2 font-semibold">
          <p>Id</p>
          <p>Nombre</p>
          <p>Categoría</p>
          <p>Stock</p>
          <p>Precio</p>
        </li>
        {
          products?.map((product, index) => (
            <Link to={`/detalle/${product.id}`} key={product.id} className="hover:opacity-70">
            <li key={product.id} className={`grid grid-cols-5 border-b border-slate-500 p-2 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-300'}`}>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.category.name}</p>
            <p>{product.stock}</p> 
            <p>${product.price}</p>
            </li>
            </Link>
        ))
      }
      </ul>
      <footer className="mt-4">
        {
          paginationData &&
          <Pagination params={paginationData} getProducts={getProducts}/>
        }
      </footer>
      </>
  )
}

export default Products