import { Link } from "react-router-dom"
import ProductForm from "../components/ProductForm"
import { useEffect, useState } from "react"
import { Product } from "../interfaces/ProductInterfaces"
import ProductService from "../services/product.service"
import Message from "../components/Message"
import ErrorMessage from "../components/ErrorMessage"
import { ErrorInterface } from "../interfaces/ErrorInterface"
import { useUser } from "../hook/useUser"
import Loading from "../components/Loading"

const NuevoProducto = () => {

  const [product, setProduct] = useState<Product>()
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleError, setVisibleError] = useState<boolean>(false);

  const { token } = useUser()

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
    } else {
      setLoading(false);
    }

  }, [token])

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  const handleSubmit = async () => {
    try {
      const response: Product = await ProductService.createProduct(product)
        setProduct(response)
        setMessage("Producto creado con exito.")
        setVisible(true)
        setProduct(undefined)
    } catch (error) {
      const apiError = error as ErrorInterface;
      setErrorMessage(apiError.message)
      setVisibleError(true)
      console.error(error);
    }
  }

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 p-4 md:p-10">
      <Message visible={visible} message={message} setVisible={setVisible}/>
      <ErrorMessage visible={visibleError} message={errorMessage} setVisible={setVisibleError}/>
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