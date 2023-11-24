import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import { LocationContextProvider } from './context/LocationContext'
import { AlertContextProvider } from './context/AlertContext'
import { UserContextProvider } from './context/UserContext'
import { PetContextProvider } from './context/PetContext'
import { OrgContextProvider } from './context/OrgContext'

export function App() {
  return (
    <BrowserRouter>
      <AlertContextProvider>
        <LocationContextProvider>
          <UserContextProvider>
            <PetContextProvider>
              <OrgContextProvider>
                <Router />
              </OrgContextProvider>
            </PetContextProvider>
          </UserContextProvider>
        </LocationContextProvider>
      </AlertContextProvider>
    </BrowserRouter>
  )
}
