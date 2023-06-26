import ApartmentIcon from '@mui/icons-material/ApartmentRounded';
import DomainAddIcon from '@mui/icons-material/DomainAddRounded';
import { green, blue } from '@mui/material/colors';
import { Layout } from '../../components/ui';
import { DescripcionDeVista } from '../../components/ui/content';
import { Option } from '../../interfaces';
import { OptionsList } from '../../components/ui/options';

export const Edificios = () => {
    const options: Option[] = [
        { text: 'Registrar edificios', icon: <DomainAddIcon />, color: green[400], path: '/admin/edificios' },
        { text: 'Lista de edificios', icon: <ApartmentIcon />, color: blue[400], path: '/admin/edificios' },
    ];
    return (
        <Layout>
            <DescripcionDeVista title='Edificios' description={`En esta vista se registran edificios o conjuntos residenciales`} />
            <OptionsList options={options} breakpoints={{ xs: 6 }} />
        </Layout>
    )
}