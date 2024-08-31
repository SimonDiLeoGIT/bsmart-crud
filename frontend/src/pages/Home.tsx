import { useEffect, useState } from "react"
import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"
import ProductService from "../services/product.service"
import { Product } from "../interfaces/ProductInterfaces"

const Home = () => {
  
  const { token } = useUser()

  if (!token) {
    window.location.href = '/login'
  }

  const logout = () => {
    console.log(localStorage.getItem('token'))
    UserService.logout()
    localStorage.removeItem('token')
    window.location.reload()
  }

  const [products , setProducts] = useState<Product[]>()
  
  useEffect(() => {
    const getProducts = async () => {
      const response = await ProductService.getProducts()
      setProducts(response.data)
    }

    getProducts()
  }, [])

  return (
    <main className="h-screen w-screen bg-gray-950 text-white p-10">
      <button onClick={logout}>Logout</button>
      <section className="w-8/12 m-auto">
        <header className="grid grid-cols-2">
          <h1 className="font-bold m-auto ml-0">Productos</h1>
          <div className="flex gap-2">
            <button className="bg-rose-900 p-2 rounded-md border font-semibold hover:opacity-70 m-auto mr-0">Categorías</button>
            <button className="bg-gray-900 p-2 rounded-md border font-semibold hover:opacity-70">Agregar Producto</button>
          </div>
        </header>
        <ul className="mt-4 shadow-xl shadow-gray-900">
          <li className="grid grid-cols-5 border-b-2 border-white p-2 font-semibold">
            <p>Id</p>
            <p>Nombre</p>
            <p>Categoría</p>
            <p>Stock</p>
            <p>Precio</p>
          </li>
          {products?.map((product) => (
            <li key={product.id} className="grid grid-cols-5 border-b border-white p-2 bg-gray-600">
              <p>{product.id}</p>
              <p>{product.name}</p>
              <p>{product.category_id}</p>
              <p>{product.stock}</p> 
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home