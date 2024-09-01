import { useEffect, useState } from "react"
import { Product } from "../interfaces/ProductInterfaces"
import { useParams } from "react-router-dom"
import ProductService from "../services/product.service"

const Detalle = () => {

  const {id} = useParams()
  const [product, setProduct] = useState<Product>()
  const [disabledInputs, setDisabledInputs] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      const response = await ProductService.getProduct(id)
      setProduct(response)
    }
    
    getProduct()
    console.log(id)
  }, [id])


  return (
    <main className="h-screen w-screen bg-gray-950 text-white p-10">
      <section className="w-8/12 m-auto">
        <header className="grid grid-cols-2">
          <h1 className="font-bold m-auto ml-0">Detalles del Producto</h1>
          <button onClick={() => setDisabledInputs(!disabledInputs)} className="bg-gray-900 p-2 rounded-md border font-semibold hover:opacity-70">Editar Producto</button>
        </header>
        <form className="grid grid-cols-4 mt-10 gap-4 max-w-2xl m-auto">
            <label className="font-semibold m-auto ml-0" htmlFor="name">Nombre</label>
            <input className="p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3" disabled={disabledInputs} type="text" id="name" name="name" value={product?.name} />
            <label className="font-semibold m-auto ml-0" htmlFor="description">Descripción</label>
            <input className="p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3" disabled={disabledInputs} type="text" id="description" name="description" value={product?.description} />
            <label className="font-semibold m-auto ml-0" htmlFor="price">Precio</label>
            <input className="p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3" disabled={disabledInputs} type="number" id="price" name="price" value={product?.price} />
            <label className="font-semibold m-auto ml-0" htmlFor="category">Categoría</label>
            <input className="p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3" disabled={disabledInputs} type="text" id="category" name="category" value={product?.category_id} />
            <label className="font-semibold m-auto ml-0" htmlFor="stock">Stock</label>
            <input className="p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3" disabled={disabledInputs} type="number" id="stock" name="stock" value={product?.stock} />
        </form>
      </section>
    </main>
  )
}

export default Detalle