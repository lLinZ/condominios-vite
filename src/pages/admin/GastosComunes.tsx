import { useState, useContext, useEffect } from 'react';
import { Layout } from '../../components/ui';
import { DescripcionDeVista } from '../../components/ui/content';
import { baseUrl } from '../../common';
import { AuthContext } from '../../context/auth';
import { ICondominium } from '../../interfaces';
import Box from '@mui/material/Box';
import { SelectCustom, TextFieldCustom, TypographyCustom } from '../../components/custom';
import { MenuItem } from '@mui/material';
interface SelectedCondominium {
    id: number;
    description: string;
    building_name: string;
}
export const GastosComunes = () => {
    const [selectedCondo, setSelectedCondo] = useState<SelectedCondominium>({
        id: 0,
        description: '',
        building_name: '',
    });
    const [condominia, setCondominia] = useState<ICondominium[] | null>(null);
    const { authState } = useContext(AuthContext);

    const getCondos = async () => {
        const url = `${baseUrl}/condominium`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setCondominia(data);
                    break;
                case 400:
                    break;
                case 404:
                    break;
                default:
                    break;
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCondos();
    }, [])

    return (
        <Layout>
            <DescripcionDeVista title={'Gastos comunes'} description={'Selecciona un condominio y empieza a añadir los gastos comunes'} />
            <SelectCustom helpertext={''} value={selectedCondo.id} onChange={(e) => {
                const value = e.target.value;
                const condoFiltered = condominia?.filter((condo: ICondominium) => Number(condo.id) === Number(value))[0];
                const sel = condoFiltered
                    ? {
                        id: condoFiltered.id,
                        description: condoFiltered.description,
                        building_name: condoFiltered.building.name
                    }
                    : {
                        id: 0,
                        description: '',
                        building_name: '',
                    };
                setSelectedCondo(sel);
            }}>
                <MenuItem value='0' disabled>Seleccione un condominio</MenuItem>
                {condominia && condominia.map((condo) => (
                    <MenuItem value={condo.id} key={condo.id}>{condo.description}</MenuItem>
                ))}
            </SelectCustom>
            <TextFieldCustom />
        </Layout>
    )
}