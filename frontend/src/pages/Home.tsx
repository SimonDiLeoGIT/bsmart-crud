import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"
import Products from "../components/Products"
import { Link } from "react-router-dom"
import Categories from "../components/Categories"
import { useState } from "react"

const Home = () => {
  
  const { token } = useUser()
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  if (!token) {
    window.location.href = '/login'
  }

  const logout = () => {
    console.log(localStorage.getItem('token'))
    UserService.logout()
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 md:p-10">      
      <button className="bg-red-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" onClick={logout}>Logout</button>
      <section className="lg:w-8/12 m-auto">
        <header className="flex justify-between">
          <h1 className="font-bold m-auto ml-0 text-xl">Productos</h1>
          <div className="flex gap-2">
            <Categories 
              visibleModal={categoriesVisible} 
              onClose={() => {
                setCategoriesVisible(false);
                setRefreshProducts(prev => !prev); // Toggle to refresh products
              }}
            />
            <Link to="/producto/crear" className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70">Agregar Producto</Link>
          </div>
        </header>
        <Products 
          refreshProducts={refreshProducts}
        />
      </section>
    </main>
  )
}

export default Home