import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"
import Products from "../components/Products"
import { Link } from "react-router-dom"
import Categories from "../components/Categories"

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

  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 p-10">      
      <button onClick={logout}>Logout</button>
      <section className="w-8/12 m-auto">
        <header className="grid grid-cols-2">
          <h1 className="font-bold m-auto ml-0 text-xl">Productos</h1>
          <div className="flex gap-2">
            <Categories />
            <Link to="/producto/crear" className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70">Agregar Producto</Link>
          </div>
        </header>
        <Products />
      </section>
    </main>
  )
}

export default Home