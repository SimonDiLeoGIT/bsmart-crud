import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { Product, ProductCategory, ProductListResponseInterface } from "../interfaces/ProductInterfaces"
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
  const [selectedSort, setSelectedSort] = useState<keyof Product | null>(null)
  
  useEffect(() => {
    getProducts(1)
  },[refreshProducts])

  useEffect(() => {
    getProducts(paginationData?.current_page)
  },[sortBy, sortOrder])
  
  const getProducts = async (page: number = 1) => {
    setLoading(true)
    const response = await ProductService.getProducts(page, sortBy, sortOrder)
    setData(response)
    setLoading(false);
  }

  const getProductsWithUrl = async (url: string) => {
    const response = await ProductService.getProductsWihUrl(url)
    setData(response)
    setLoading(false);
  }

  const setData = (data: ProductListResponseInterface) => {
    setProducts(data.data)
    setPaginationData(
      {
        current_page: data.current_page,
        first_page_url: data.first_page_url,
        from: data.from,
        last_page: data.last_page,
        last_page_url: data.last_page_url,
        next_page_url: data.next_page_url,
        path: data.path,
        per_page: data.per_page,
        prev_page_url: data.prev_page_url,
        to: data.to,
        total: data.total
      }
    )
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
      <ul className={`mt-4 shadow-lg shadow-slate-400 min-h-96 ${ loading && 'opacity-80' } relative`}>
        <li className="grid grid-cols-3 md:grid-cols-5 border-b-2 border-slate-700 p-2 font-semibold">
            <SortSelector text="Id" options={['Up', 'Down']} id='id' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            <SortSelector text="Nombre" options={['Up', 'Down']} id='name' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            <SortSelector text="Categoría" options={['Up', 'Down']} id='category_id' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            <div className="hidden md:block"><SortSelector text="Stock" options={['Up', 'Down']} id='stock' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /></div>
            <div className="hidden md:block"><SortSelector text="Precio" options={['Up', 'Down']} id='price' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /></div>
        </li>
        {
          loading &&
          <div 
            role="alert"
            aria-live="assertive"
            className="absolute top-0 w-full h-full left-0 flex justify-center items-center z-50"
          >
            <Loading />
          </div>
        }
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
        products && paginationData &&
          <Pagination params={paginationData} getProducts={getProducts} getProductsWithUrl={getProductsWithUrl}/>
      }
      </>
  )
}

export default Products