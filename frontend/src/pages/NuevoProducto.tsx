import { Link } from "react-router-dom"
import ProductForm from "../components/ProductForm"
import { useState } from "react"
import { Product } from "../interfaces/ProductInterfaces"
import ProductService from "../services/product.service"
import Message from "../components/Message"
import ErrorMessage from "../components/ErrorMessage"

const NuevoProducto = () => {

  const [product, setProduct] = useState<Product>()
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleError, setVisibleError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (product) {
      try {
        const response = await ProductService.createProduct(product)
        if (response) {
          setProduct(response)
          setMessage("Producto creado con exito.")
          setVisible(true)
          setTimeout(() => {
            setVisible(false)
          }, 3000)
          setProduct(undefined)
        }
      } catch (error) {
        setErrorMessage("Ocurrió un error al crear el producto.")
        setVisibleError(true)
        setTimeout(() => {
          setVisibleError(false)
        }, 3000)
        console.error(error);
      }
    }
  }

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 p-4 md:p-10">
      <Message visible={visible} message={message} />
      <ErrorMessage visible={visibleError} message={errorMessage} />
      <section className="lg:w-8/12 m-auto">
        <header className="flex">
          <h1 className="font-bold m-auto ml-0 text-xl">Agregar Producto</h1>
          <Link to='/' className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Volver</Link>
        </header>
        <ProductForm product={product} setProduct={setProduct} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
      </section>
    </main>
  )
}

export default NuevoProducto