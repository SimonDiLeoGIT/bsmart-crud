import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode
}

type LoadingContext = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const LoadingContext = createContext({} as LoadingContext)

const LoadingProvider = ({ children }: Props) => {
  const [loading, _setLoading] = useState<boolean>(false)
  
  const setLoading = (loading: boolean) => {
    _setLoading(loading)
  }


  return (
    <LoadingContext.Provider value={{
      loading,
      setLoading
    }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider