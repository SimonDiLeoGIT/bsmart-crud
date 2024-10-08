import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loading from "../components/Loading"

const Home = lazy(() => import("../pages/Home"))
const Register = lazy(() => import("../pages/Register"))
const Login = lazy(() => import("../pages/Login"))
const Detalle = lazy(() => import("../pages/Detalle"))
const NuevoProducto = lazy(() => import("../pages/NuevoProducto"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Navbar = lazy(() => import("../components/Navbar"))

const Router = () => {
  return (
    <Suspense 
      fallback={
        <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-slate-100">
          <Loading />
        </div>
      }>
      <BrowserRouter>
        <header className="w-screen max-w-full bg-slate-100 shadow-md shadow-slate-400 relative">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/producto/crear" element={<NuevoProducto />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router