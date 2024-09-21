import LoadingProvider from "./context/loading"
import ProductProvider from "./context/products"
import UserProvider from "./context/user"
import Router from "./utils/Router"


function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <ProductProvider>
          <Router />
        </ProductProvider>
      </UserProvider>
    </LoadingProvider>
  )
}

export default App
