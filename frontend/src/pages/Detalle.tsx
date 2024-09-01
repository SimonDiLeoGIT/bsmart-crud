import { useEffect, useState } from "react"
import { Product } from "../interfaces/ProductInterfaces"
import { useParams } from "react-router-dom"
import ProductService from "../services/product.service"
import ProductForm from "../components/ProductForm"

const Detalle = () => {

  const {id} = useParams()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (id){
      const getProduct = async () => {
        const response = await ProductService.getProduct(id)
        setProduct(response)
      }
      
      getProduct()
    }
  }, [id])


  return (
    <main className="h-screen w-screen bg-gray-950 text-white p-10">
      <section className="w-8/12 m-auto">
        <header>
          <h1 className="font-bold m-auto ml-0">Detalles del Producto</h1>
        </header>
        <ProductForm product={product} setProduct={setProduct} />
      </section>
    </main>
  )
}

export default Detalle