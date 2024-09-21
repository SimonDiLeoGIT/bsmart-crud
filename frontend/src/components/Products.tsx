import { useEffect, useState } from "react"
import ProductService from "../services/product.service"
import { Product } from "../interfaces/ProductInterfaces"
import Pagination from "../utils/Pagination"
import Loading from "./Loading"
import Message from "./Message"
import ProductItem from "./ProductItem"
import { SortSelector } from "./SortSelector"
import { useProducts } from "../hook/useProducts"
import { useLoading } from "../hook/useLoading"


interface Props {
  refreshProducts: boolean
}

const Products:React.FC<Props> = ({refreshProducts}) => {

  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<keyof Product>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [selectedSort, setSelectedSort] = useState<keyof Product | null>(null)

  const { getProducts, getProductsWithUrl, products} = useProducts()
  const { loading } = useLoading()
  
  useEffect(() => {
    getProducts(1, sortBy, sortOrder)
  },[refreshProducts]) // eslint-disable-line

  useEffect(() => {
    if(products) getProducts(products?.current_page, sortBy, sortOrder)
  },[sortBy, sortOrder]) // eslint-disable-line

  const handleDelete = async (id: number) => {
    try {
      const response = await ProductService.deleteProduct(id)
      if (response) {
        setMessage("Producto eliminado con exito.")
        setVisible(true)
        getProductsWithUrl(products?.path + '?page=' + products?.current_page)
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
          (products?.data.length === 0 && !loading) ?
            <li className="grid h-96 place-content-center">
              <p className="m-auto">No hay productos</p>
            </li>
          :
          products?.data.map((product, index) => (
            <ProductItem product={product} index={index} handleDelete={handleDelete} key={product.id}/>
        ))
      }
      </ul>
      {
        products &&
          <Pagination params={products} getProductsWithUrl={getProductsWithUrl}/>
      }
      </>
  )
}

export default Products