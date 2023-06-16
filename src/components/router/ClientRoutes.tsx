import { Route, Routes } from 'react-router'
import { Dashboard, Pagos, Perfil } from '../../pages/client'
import { InfoPago } from '../../pages/client/pagos/InfoPago'
import { RegistrarPago } from '../../pages/client/pagos/RegistrarPago'

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/pagos' element={<Pagos />} />
      <Route path='/pagos/lista' element={<InfoPago />} />
      <Route path='/pagos/registrar' element={<RegistrarPago />} />
      <Route path='/perfil' element={<Perfil />} />
    </Routes>
  )
}