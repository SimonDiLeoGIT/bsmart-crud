import { useUser } from "../hook/useUser"
import UserService from "../services/user.service"

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
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home