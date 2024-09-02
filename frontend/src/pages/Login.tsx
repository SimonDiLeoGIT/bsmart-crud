import { useEffect, useState } from "react";
import UserService from "../services/user.service"
import { UserLoginInterface } from "../interfaces/UserInterfaces"
import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {

  const { setUser, setToken } = useUser()

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleError, setVisibleError] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Login";
  })

  async function login(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data: UserLoginInterface = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await UserService.login(data);
      setUser(response.user);
      setToken(response.token);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage("Usuario no autorizado.")
        setVisibleError(true)
        setTimeout(() => {
          setVisibleError(false)
        }, 3000)
      console.log(error);
    }
  }

  return (
    <section className="fixed top-0 left-0 w-screen h-screen -bg--color-white z-50 flex overflow-hidden bg-slate-100 text-slate-900">
    <ErrorMessage visible={visibleError} message={errorMessage} />
    <form 
      onSubmit={login}
      method="POST"
      className="flex flex-col gap-4 border rounded-lg w-10/12 max-w-lg m-auto shadow-lg shadow-gray-600 p-4 px-8 pb-10 "
    >
      <legend className="font-semibold m-auto">Login</legend>
      <input 
        name='email' 
        type="email" 
        placeholder="Email" 
        required 
        minLength={3} 
        maxLength={30} 
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <input 
        name='password' 
        type="password" 
        placeholder="Password" 
        required 
        minLength={8} 
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must be at least 8 characters long, including at least one number, one uppercase letter, and one lowercase letter."
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <p className="text-center text-sm -text--color-black opacity-90 mt-4">You don't have an account? <Link to="/register" className="text-blue-700 border-b border-blue-700 hover:opacity-60">Sign up</Link></p>
      <button 
        type="submit"
        className="w-7/12 m-auto p-2 bg-blue-700 text-white font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150"
      >
        Login
      </button>
    </form>
  </section>
  )

}

export default Login