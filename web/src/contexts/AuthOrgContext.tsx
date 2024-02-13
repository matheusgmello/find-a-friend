import { api } from '@/services/http'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Cookies from 'js-cookie'

type Credentials = {
  email: string
  password: string
}

type Org = {
  address: string
  cep: string
  email: string
  id: string
  nome: string
  whatsappNumber: string
}

type AuthOrgContextData = {
  isAuth: boolean
  org: Org | null
  signIn: (credentials: Credentials) => Promise<void>
  signOut: () => void
  signUp: (data: any) => Promise<void>
}

type AuthSessionReponse = {
  token: string
  refreshToken: string
  org: Org
}

const AuthOrgContext = createContext({} as AuthOrgContextData)

interface AuthOrgContextProviderProps {
  children: ReactNode
}

export function AuthOrgContextProvider({
  children,
}: AuthOrgContextProviderProps) {
  const [org, setOrg] = useState<Org | null>(null)
  const isAuth = !!org

  useEffect(() => {
    const org = localStorage.getItem('org')
    const token = Cookies.get('token')
    if (org && token) {
      setOrg(JSON.parse(org))
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }, [])

  const signIn = useCallback(async (credentials: Credentials) => {
    const { data } = await api.post<AuthSessionReponse>(
      '/auth/sessions',
      credentials,
    )
    Cookies.set('token', data.token)
    localStorage.setItem('org', JSON.stringify(data.org))
    setOrg(data.org)
    api.defaults.headers.Authorization = `Bearer ${data.token}`
  }, [])

  const signOut = useCallback(() => {
    setOrg(null)
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    localStorage.removeItem('org')
  }, [])

  const signUp = useCallback(async (data: any) => {
    await api.post('/orgs', data)
  }, [])

  const value = useMemo(
    () => ({ isAuth, org, signIn, signOut, signUp }),
    [isAuth, org, signIn, signOut, signUp],
  )

  return (
    <AuthOrgContext.Provider value={value}>{children}</AuthOrgContext.Provider>
  )
}

export const useAuthOrg = () => {
  const context = useContext(AuthOrgContext)
  if (!context) {
    throw new Error(
      'useAuthOrgContext must be used within a AuthOrgContextProvider',
    )
  }
  return context
}
