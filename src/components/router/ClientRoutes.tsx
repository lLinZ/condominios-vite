import React from 'react'
import { Route, Routes } from 'react-router'
import { Dashboard, Pagos, Perfil } from '../../pages/client'

type Props = {}

export const ClientRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/pagos' element={<Pagos />} />
      <Route path='/perfil' element={<Perfil />} />
    </Routes>
  )
}