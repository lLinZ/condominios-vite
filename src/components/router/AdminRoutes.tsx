import React from 'react'
import { Route, Routes } from 'react-router'
import { Condominios, Divisas, Dashboard, Edificios, GastosComunes, GastosNoComunes, Proveedores, Unidades, Usuarios } from '../../pages/admin'

type Props = {}

export const AdminRoutes = (props: Props) => {
    return (
        <Routes>
            <Route path='/admin/condominios' element={<Condominios />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/divisas' element={<Divisas />} />
            <Route path='/admin/edificios' element={<Edificios />} />
            <Route path='/admin/gastos/comunes' element={<GastosComunes />} />
            <Route path='/admin/gastos/nocomunes' element={<GastosNoComunes />} />
            <Route path='/admin/usuarios' element={<Usuarios />} />
            <Route path='/admin/unidades' element={<Unidades />} />
            <Route path='/admin/proveedores' element={<Proveedores />} />
        </Routes>
    )
}