import { ReactNode, createContext, useState } from "react";
import { UserInterface } from "../interfaces/UserInterfaces";

interface Props {
  children: ReactNode
}

type UserContext = {
  setUser: (user: UserInterface | null) => void
  user: UserInterface | null
  setToken: (token: string) => void
  token: string | null
  clearToken: () => void
}

export const UserContext = createContext({} as UserContext)

const UserProvider = ({ children }: Props) => {
  const [user, _setUser] = useState<UserInterface | null>(null)
  const [token, _setToken] = useState<string | null>(localStorage.getItem('token') || null)

  const setUser = (user: UserInterface | null) => {
    _setUser(user)
  }

  const setToken = (token: string) => {
    _setToken(token)
    localStorage.setItem('token', token)
  }

  const clearToken = () => {
    _setToken('')
    localStorage.removeItem('token')
  }

  return (
    <UserContext.Provider value={{
      setUser,
      user,
      token,
      setToken,
      clearToken
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider