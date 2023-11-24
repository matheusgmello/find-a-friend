import { api } from '@/lib/axios'
import { LoginOrgResponse } from '@/models/interfaces/Auth'
import { LoginOrgFormData } from '@/validator/auth/LoginOrg'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AlertContext } from './AlertContext'
import { isAxiosError } from 'axios'
import { Org } from '@/models/interfaces/Org'
import { RegisterOrgFormData } from '@/validator/auth/RegisterOrg'
import {
  ResponseError,
  ResponseValidateToken,
} from '@/models/interfaces/ApiResponse'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface OrgContextValues {
  token: string
  org: Org
  onLoginOrg: (body: LoginOrgFormData) => void
  onRegisterOrg: (body: RegisterOrgFormData) => void
  onSignOut: () => void
}

export const OrgContext = createContext({} as OrgContextValues)

interface OrgContextProviderProps {
  children: ReactNode
}

export function OrgContextProvider({ children }: OrgContextProviderProps) {
  const { alertDispatch } = useContext(AlertContext)

  const [token, setToken] = useState('')

  const [org, setOrg] = useState({} as Org)

  const navigate = useNavigate()

  useEffect(() => {
    const tokenOnLocalStorage = localStorage.getItem('authorization')
    // validateToken(token)
    const orgOnLocalStorage: Org = JSON.parse(
      localStorage.getItem('organization'),
    )

    if (tokenOnLocalStorage && !token) {
      setToken(tokenOnLocalStorage)
      validateToken(tokenOnLocalStorage)
    }

    if (orgOnLocalStorage?.email && !org?.email) {
      setOrg(orgOnLocalStorage)
    }

    if (org?.email && org?.email !== orgOnLocalStorage?.email) {
      localStorage.setItem('organization', JSON.stringify(org))
    }

    if (token && token !== tokenOnLocalStorage) {
      localStorage.setItem('authorization', token)
      // setCookie(token)
      // Cookies.set('refreshToken', token)
    }
  }, [token, org])

  async function validateToken(token: string) {
    try {
      setCookie(token)
      const { data } = await api.patch<ResponseValidateToken>(
        '/auth/refresh-token',
        {},
        {
          withCredentials: true,
        },
      )
      setCookie(data.token)
      localStorage.setItem('authorization', data.token)
      setToken(data.token)
    } catch (error) {
      console.error('Revalidate Error', error)
      if (isAxiosError<ResponseError>(error)) {
        onSignOut()
      }
    }
  }
  function setCookie(token: string) {
    Cookies.set('refreshToken', token, {
      domain: 'localhost',
      path: '/',
      expires: 2,
      secure: true,
      sameSite: 'Strict',
    })
  }

  async function onSignOut() {
    Cookies.remove('refreshToken')
    localStorage.removeItem('authorization')
    setOrg(undefined)
    setToken('')
  }

  async function onLoginOrg(body: LoginOrgFormData) {
    try {
      // Cookies.remove('refreshToken')
      const { data } = await api.post<LoginOrgResponse>('/auth/sessions', body)
      localStorage.setItem('authorization', data.token)
      setCookie(data.token)
      setToken(data.token)
      setOrg(data.org)
      alertDispatch({
        action: 'success',
        description: 'Com sucesso',
        title: 'Login',
      })
      navigate('/')
    } catch (error) {
      console.error('Login', error)
      if (isAxiosError<ResponseError>(error)) {
        onSignOut()
        alertDispatch({
          action: 'error',
          description: error.response.data.error,
          title: 'Falha',
        })
      }
    }
  }

  async function onRegisterOrg(body: RegisterOrgFormData) {
    try {
      await api.post('/orgs', {
        whatsappNumber: `+55${body.phone}`,
        cep: body.zip,
        ...body,
      })
      alertDispatch({
        action: 'success',
        description: 'Com sucesso',
        title: 'Registro',
      })
      navigate('/login')
    } catch (error) {
      console.error('Register', error)

      if (isAxiosError<ResponseError>(error)) {
        alertDispatch({
          action: 'error',
          description: error.response.data.error,
          title: 'Erro',
        })
      }
    }
  }
  return (
    <OrgContext.Provider
      value={{
        org,
        token,
        onLoginOrg,
        onRegisterOrg,
        onSignOut,
      }}
    >
      {children}
    </OrgContext.Provider>
  )
}
