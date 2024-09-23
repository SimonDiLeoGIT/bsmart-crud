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
  const [selectedSort, setSelectedSort] = useState<keyof Product | null>(null)

  const { getProducts, getProductsWithUrl, products, setSortBy, setSortOrder, setProductsPerPage, productsPerPage, setName} = useProducts()
  const { loading } = useLoading()
  
  useEffect(() => {
    getProducts(1)
  },[refreshProducts]) // eslint-disable-line

  const handleDelete = async (id: number) => {
    try {
      const response = await ProductService.deleteProduct(id)
      if (response) {
        setMessage("Producto eliminado con exito.")
        setVisible(true)
        getProductsWithUrl(`${products?.path}?page=${products?.current_page}&per_page=${products?.per_page}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelect = (id: keyof Product, op: string) => {
    setSortBy(id)
    setSortOrder(op === 'Up' ? 'asc' : 'desc')
  }

  const handleItemsCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.replace(/^0+/, '');
    }
    setProductsPerPage(Number(newValue));
  };
  
  return (
    <section>
      <Message message={message} visible={visible}  setVisible={setVisible}/>
      <header className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="text-xl font-bold">Productos<span className="text-slate-500"> ({products?.total})</span></h1>
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <fieldset className="flex items-center">
            <button type="button" onClick={() => setProductsPerPage(productsPerPage-1)} className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" >-</button>
              <input type="number" className="p-2 w-12 border-b-4 text-center border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300" value={productsPerPage} min={0} max={products?.total} onChange={handleItemsCountChange} />
            <button type="button" onClick={() => setProductsPerPage(productsPerPage+1)} className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" >+</button>
          </fieldset>
          <fieldset className="flex-1 md:flex-none">
            <input type="text" placeholder="Buscar..." className="w-full p-2 border-b-4 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300" onChange={(e) => setName(e.target.value)} />
          </fieldset>
        </form>
      </header>
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
          <Pagination />
      }
      </section>
  )
}

export default Products