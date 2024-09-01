import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { Product } from "../interfaces/ProductInterfaces"
import Pagination from "../utils/Pagination"
import { PaginationInterface } from "../interfaces/Pagination"
import { Link } from "react-router-dom"

const Products = () => {

  const [products , setProducts] = useState<Product[]>()
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
      <ul className="mt-4 shadow-xl shadow-gray-900">
        <li className="grid grid-cols-5 border-b-2 border-white p-2 font-semibold">
          <p>Id</p>
          <p>Nombre</p>
          <p>Categoría</p>
          <p>Stock</p>
          <p>Precio</p>
        </li>
        {products?.map((product) => (
          <Link to={`/detalle/${product.id}`} key={product.id} className="hover:opacity-90">
            <li key={product.id} className="grid grid-cols-5 border-b border-white p-2 bg-gray-600">
              <p>{product.id}</p>
              <p>{product.name}</p>
              <p>{product.category_id}</p>
              <p>{product.stock}</p> 
              <p>${product.price}</p>
            </li>
          </Link>
        ))}
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