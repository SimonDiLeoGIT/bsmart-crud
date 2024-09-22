import { useUser } from "../hook/useUser"
import Products from "../components/Products"
import { Link } from "react-router-dom"
import Categories from "../components/Categories"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"

import '../../public/styles/home.css'

const Home = () => {
  
  const { token } = useUser()
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

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
      <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-slate-100">
        <Loading />
      </div>
    )
  }


  return (
    <main className="h-screen w-screen max-w-full bg-slate-100 text-slate-900">
      <section className="lg:w-8/12 m-auto py-4">
        <header className="flex justify-end gap-2 my-4">
            <Categories 
              visibleModal={categoriesVisible} 
              onClose={() => {
                setCategoriesVisible(false);
                setRefreshProducts(prev => !prev);
              }}
            />
            <Link to="/producto/crear" className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70">Agregar Producto</Link>
        </header>
        <Products 
          refreshProducts={refreshProducts}
        />
      </section>
    </main>
  )
}

export default Home