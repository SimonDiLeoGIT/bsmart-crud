import { useEffect, useState } from "react"
import { Product } from "../interfaces/ProductInterfaces"
import { Link, useParams } from "react-router-dom"
import ProductService from "../services/product.service"
import ProductForm from "../components/ProductForm"
import Message from "../components/Message"
import Loading from "../components/Loading"

const Detalle = () => {

  const {id} = useParams()
  const [product, setProduct] = useState<Product>()
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const response = await ProductService.getProduct(id)
        setProduct(response)
      }
      
      getProduct()
    }
  }, [id])

  const handleSubmit = async () => {
    if (product) {
      try {
        const response = await ProductService.updateProduct(product)
        if (response) {
          setProduct(response)
          setMessage("Producto actualizado con exito")
          setVisible(true)
          setTimeout(() => {
            setVisible(false)
          }, 3000)
          setEditing(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 p-10">
      <Message visible={visible} message={message} />
      <section className="w-8/12 m-auto">
        <header className="flex">
          <h1 className="font-bold m-auto ml-0 text-xl">Detalles del Producto</h1>
          <Link to='/' className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Volver</Link>
        </header>
        {
          !product ?
          <div className="fixed top-1/3 left-0 w-screen flex items-center">
            <Loading />
          </div> 
          :
          <div className="text-center">
            <ProductForm product={product} setProduct={setProduct} handleSubmit={handleSubmit} editing={editing} />
            {
              !editing &&
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-700 p-2 rounded-md border font-semibold hover:opacity-70 text-slate-100 w-6/12"
              >
                Editar Producto
              </button>
            }
          </div>
        }
      </section>
    </main>
  )
}

export default Detalle