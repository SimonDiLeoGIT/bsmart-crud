import LoadingProvider from "./context/loading"
import ProductProvider from "./context/products"
import UserProvider from "./context/user"
import Router from "./utils/Router"


function App() {
  return (
    <UserProvider>
      <LoadingProvider>
        <ProductProvider>
          <Router />
        </ProductProvider>
      </LoadingProvider>
    </UserProvider>
  )
}

export default App
