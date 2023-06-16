import { useContext } from 'react';
import { OptionsList } from '../../components/client/options';
import { TypographyCustom } from '../../components/custom';
import { Layout } from '../../components/ui';
import Box from '@mui/material/Box';
import { AuthContext } from '../../context/auth';
import { Option } from '../../interfaces';
import { green, blue } from '@mui/material/colors';
import AddCardIcon from '@mui/icons-material/AddCardRounded';
import FactCheckIcon from '@mui/icons-material/FactCheckRounded';
import { BusquedaPago } from './pagos/BusquedaPago';
import { Divider } from '@mui/material';
import { DescripcionDeVista } from '../../components/ui/content/DescripcionDeVista';

export const Pagos = () => {

    const context = useContext(AuthContext);

    const clientOptions: Option[] = [
        { text: 'Lista de pagos', icon: <FactCheckIcon />, color: blue[300], path: '/pagos/lista' },
        { text: 'Registrar', icon: <AddCardIcon />, color: green[300], path: '/pagos/registrar' },
    ]
    return (
        <Layout>
            <DescripcionDeVista title={'Pagos'} description={'Consulta la informacion de un pago o registra uno nuevo'} />
            <OptionsList options={clientOptions} breakpoints={{ xs: 6, sm: 6, md: 6, lg: 6 }} />
            <Divider sx={{ borderColor: 'transparent', mb: 4 }} />
            <BusquedaPago />
        </Layout>
    )
}