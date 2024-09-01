import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"
import Products from "../components/Products"

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
        <Products />
      </section>
    </main>
  )
}

export default Home