import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Map } from '../pages/Map'
import { Pet } from '@/pages/Pet'
import { Login } from '@/pages/Auth/Login'
import { Register } from '@/pages/Auth/Register'
import { Admin } from '@/pages/Admin'
import { AdminPet } from '@/pages/Admin/Pet'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/pet/:id" element={<Pet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/pet" element={<AdminPet />} />
    </Routes>
  )
}
