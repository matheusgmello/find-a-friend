import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import './i18n/zod'

import { SearchPetsContextProvider } from '@/contexts/SearchPetsContext'
import { Router } from '@/routes'
import GlobalStyles, { theme } from '@/styles/global'
import { AuthOrgContextProvider } from './contexts/AuthOrgContext'

function App() {
  return (
    <AuthOrgContextProvider>
      <SearchPetsContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyles />
        </ThemeProvider>
        <ToastContainer />
      </SearchPetsContextProvider>
    </AuthOrgContextProvider>
  )
}

export default App
