import { useEffect, useState } from "react";
import UserService from "../services/user.service"
import { UserRegisterInterface } from "../interfaces/UserInterfaces"
import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import ErrorMessage from "../components/ErrorMessage";
import { ErrorInterface } from "../interfaces/ErrorInterface";

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

    const data: UserRegisterInterface = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      password_confirmation: formData.get('password_confirmation') as string
    };

    try {
      const response = await UserService.register(data);
      setUser(response.user);
      setToken(response.token);
      window.location.href = "/";
    } catch (error) {
      const apiError = error as ErrorInterface;
      setErrorMessage(apiError.message)
      setVisibleError(true)
    }
  }

  return (
    <section className="fixed top-0 left-0 w-screen h-screen -bg--color-white z-50 flex overflow-hidden bg-slate-100 text-slate-900">
    <ErrorMessage visible={visibleError} message={errorMessage} setVisible={setVisibleError}/>
    <form 
      onSubmit={login}
      method="POST"
      className="flex flex-col gap-4 border rounded-lg w-10/12 max-w-lg m-auto shadow-lg shadow-gray-600 p-4 px-8 pb-10 "
    >
      <legend className="font-semibold m-auto">Register</legend>
      <input 
        name='name' 
        type="text" 
        placeholder="Name"
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <input 
        name='email' 
        type="text" 
        placeholder="Email"
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <input 
        name='password' 
        type="password" 
        placeholder="Password"
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <input 
        name='password_confirmation' 
        type="password" 
        placeholder="Confirm Password"
        className="p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
      />
      <p className="text-center text-sm -text--color-black opacity-90 mt-4">You already have an account? <Link to="/login" className="text-blue-700 border-b border-blue-700 hover:opacity-60">Login</Link></p>
      <button 
        type="submit"
        className="w-7/12 m-auto p-2 bg-blue-700 text-white font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150"
      >
        Register
      </button>
    </form>
  </section>
  )

}

export default Login