import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"
import Products from "../components/Products"
import { Link } from "react-router-dom"
import Categories from "../components/Categories"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { useProducts } from "../hook/useProducts"

import '../../public/styles/home.css'

const Home = () => {
  
  const { token } = useUser()
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const { productsPerPage, setProductsPerPage, products } = useProducts()

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
  const logout = () => {
    console.log(localStorage.getItem('token'))
    UserService.logout()
    localStorage.removeItem('token')
    window.location.reload()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.replace(/^0+/, '');
    }
    setProductsPerPage(Number(newValue));
  };



  return (
    <main className="h-screen w-screen bg-slate-100 text-slate-900 md:p-10">      
      <button className="bg-red-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" onClick={logout}>Logout</button>
      <section className="lg:w-8/12 m-auto">
        <header className="flex justify-between">
          <h1 className="font-bold m-auto ml-0 text-xl">Productos<span className="text-slate-500"> ({products?.total})</span></h1>
          <div className="flex gap-2">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <fieldset>
                <button type="button" onClick={() => setProductsPerPage(productsPerPage-1)} className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" >-</button>
                  <input type="number" className="p-2 w-12 border-b-2 text-center border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300" value={productsPerPage} min={0} max={products?.total} onChange={handleInputChange} />
                <button type="button" onClick={() => setProductsPerPage(productsPerPage+1)} className="bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70" >+</button>
              </fieldset>
            </form>
            <Categories 
              visibleModal={categoriesVisible} 
              onClose={() => {
                setCategoriesVisible(false);
                setRefreshProducts(prev => !prev);
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