import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { ProductCategory } from "../interfaces/ProductInterfaces"
import Pagination from "../utils/Pagination"
import { PaginationInterface } from "../interfaces/Pagination"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import DeleteModal from "./DeleteModal"
import Message from "./Message"


interface Props {
  refreshProducts: boolean
}

const Products:React.FC<Props> = ({refreshProducts}) => {

  const [products , setProducts] = useState<ProductCategory[]>()
  const [paginationData, setPaginationData] = useState<PaginationInterface>()
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    getProducts(1)
  },[refreshProducts])
  
  const getProducts = async (page: number = 1) => {
    setLoading(true)
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
    setLoading(false);
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await ProductService.deleteProduct(id)
      if (response) {
        setMessage("Producto eliminado con exito.")
        setVisible(true)
        setTimeout(() => {
          setVisible(false)
        }, 3000)
        getProducts(paginationData?.current_page)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Message message={message} visible={visible} />
        {
          loading &&
          <div className="fixed top-1/3 w-screen left-0 flex justify-center items-center">
            <Loading />
          </div>
        }
      <ul className="mt-4 shadow-lg shadow-slate-400">
        <li className="grid grid-cols-3 md:grid-cols-5 border-b-2 border-slate-700 p-2 font-semibold">
          <p>Id</p>
          <p>Nombre</p>
          <p className="hidden md:block">Categoría</p>
          <p className="hidden md:block">Stock</p>
          <p>Precio</p>
        </li>
        {
          (products?.length === 0 && !loading) ?
            <li className="grid h-96 place-content-center">
              <p className="m-auto">No hay productos</p>
            </li>
          :
          products?.map((product, index) => (
            <li key={product.id} className="relative">
              <Link to={`/detalle/${product.id}`} className="hover:opacity-70">
                <article className={`grid grid-cols-3 md:grid-cols-5 border-b border-slate-500 p-2 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-300'}`}>
                  <p>{product.id}</p>
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
                  <p className="hidden md:block">{product.category.name}</p>
                  <p className="hidden md:block">{product.stock}</p> 
                  <p>${product.price}</p>
                </article>
              </Link>
              <div className="absolute right-4 top-2">
                <DeleteModal id={product.id} name={product.name} handleDelete={handleDelete} message="¿Deseas eliminar este producto?"/>
              </div>
            </li>
        ))
      }
      </ul>
      {
        products && 
        <footer className="mt-4">
          {
            paginationData &&
            <Pagination params={paginationData} getProducts={getProducts}/>
          }
        </footer>
      }
      </>
  )
}

export default Products