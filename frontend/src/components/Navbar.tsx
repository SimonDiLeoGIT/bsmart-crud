import { Link } from "react-router-dom"
import UserService from "../services/user.service"

const Navbar = () => {

  const logout = () => {
    console.log(localStorage.getItem('token'))
    UserService.logout()
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <nav className="flex justify-between">
      <ul className="flex items-center ml-4 text-lg ">
        <li className="">
          <Link to="/" className="block p-4 border-b-4 hover:bg-slate-300 hover:border-b-4 hover:border-blue-700"> Home </Link>
        </li>
        <li>
          <Link to="/dashboard" className="block p-4 border-b-4 hover:bg-slate-300 hover:border-b-4 hover:border-blue-700"> Dashboard </Link>
        </li>
      </ul>
      <button className="bg-red-700 text-slate-100 m-2 p-2 rounded-md font-semibold hover:opacity-70" onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar