import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home = lazy(() => import("../pages/Home"))
const Register = lazy(() => import("../pages/Register"))
const Login = lazy(() => import("../pages/Login"))

const Router = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/:type/all" element={<NewsProducts />} />
          <Route path="/accessories/:category" element={<Accessory />} />
          <Route path="/:sex/:category" element={<Category />} />
          <Route path="/:type/news/gym-clothes" element={<NewsProducts />} />
          <Route path="/:type" element={<NewsProducts />} />
          <Route path="/product/:id/:colorId" element={<Product />} /> */}
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/terms&conditions" element={<TerminosCondiciones />} /> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router