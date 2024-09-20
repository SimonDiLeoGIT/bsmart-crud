import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { Product, ProductCategory } from "../interfaces/ProductInterfaces"
import Pagination from "../utils/Pagination"
import { PaginationInterface } from "../interfaces/Pagination"
import Loading from "./Loading"
import Message from "./Message"
import ProductItem from "./ProductItem"
import { SortSelector } from "./SortSelector"


interface Props {
  refreshProducts: boolean
}

const Products:React.FC<Props> = ({refreshProducts}) => {

  const [products , setProducts] = useState<ProductCategory[]>()
  const [paginationData, setPaginationData] = useState<PaginationInterface>()
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<keyof Product>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  
  useEffect(() => {
    getProducts(1)
  },[refreshProducts])

  useEffect(() => {
    getProducts(paginationData?.current_page, sortBy, sortOrder)
  },[sortBy, sortOrder])
  
  const getProducts = async (page: number = 1, sortBy: string = 'id', sortOrder: string = 'asc') => {
    setLoading(true)
    const response = await ProductService.getProducts(page, sortBy, sortOrder)
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
        getProducts(paginationData?.current_page)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelect = (id: keyof Product, op: string) => {
    setSortBy(id)
    setSortOrder(op === 'Up' ? 'asc' : 'desc')
  }

  return (
    <>
      <Message message={message} visible={visible}  setVisible={setVisible}/>
        {
          loading &&
          <div className="fixed top-1/3 w-screen left-0 flex justify-center items-center">
            <Loading />
          </div>
        }
      <ul className="mt-4 shadow-lg shadow-slate-400">
        <li className="grid grid-cols-3 md:grid-cols-5 border-b-2 border-slate-700 p-2 font-semibold">
            <SortSelector text="Id" options={['Up', 'Down']} id='id' handleSelect={handleSelect} />
            <SortSelector text="Nombre" options={['Up', 'Down']} id='name' handleSelect={handleSelect} />
            <SortSelector text="Categoría" options={['Up', 'Down']} id='category_id' handleSelect={handleSelect} />
            <SortSelector text="Stock" options={['Up', 'Down']} id='stock' handleSelect={handleSelect} />
            <SortSelector text="Precio" options={['Up', 'Down']} id='price' handleSelect={handleSelect} />
        </li>
        {
          (products?.length === 0 && !loading) ?
            <li className="grid h-96 place-content-center">
              <p className="m-auto">No hay productos</p>
            </li>
          :
          products?.map((product, index) => (
            <ProductItem product={product} index={index} handleDelete={handleDelete} key={product.id}/>
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