import { ReactNode, createContext, useEffect, useState } from 'react'

interface UserContextProviderProps {
  children: ReactNode
}

interface UserProps {
  state: string
  city: string
}

interface UserContextProps {
  user: UserProps
  registerUserLocation: ({ city, state }: UserProps) => void
}

export const UserContext = createContext({} as UserContextProps)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState({} as UserProps)

  useEffect(() => {
    const userCityOnLocalStorage = localStorage.getItem('user-location-city')
    const userStateOnLocalStorage = localStorage.getItem('user-location-state')

    if (
      userCityOnLocalStorage &&
      userStateOnLocalStorage &&
      !user.city &&
      !user.state
    ) {
      setUser({
        city: userCityOnLocalStorage,
        state: userStateOnLocalStorage,
      })
    }
    if (
      user.city &&
      user.state &&
      userCityOnLocalStorage !== user.city &&
      userStateOnLocalStorage !== user.state
    ) {
      localStorage.setItem('user-location-city', user.city)
      localStorage.setItem('user-location-state', user.state)
    }
  }, [user])

  function registerUserLocation({ city, state }: UserProps) {
    setUser({ city, state })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        registerUserLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
