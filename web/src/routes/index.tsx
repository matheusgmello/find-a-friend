import { Route, Routes } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Map } from '@/pages/Map'
import { PetCreate } from '@/pages/PetCreate'
import { PetProfile } from '@/pages/PetProfile'
import { Register } from '@/pages/Register'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pet-create" element={<PetCreate />} />
      <Route path="/pet-profile/:id" element={<PetProfile />} />
    </Routes>
  )
}
