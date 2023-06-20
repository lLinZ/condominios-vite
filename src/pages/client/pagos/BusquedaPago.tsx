import { useContext, useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';

import { AuthContext } from '../../../context/auth';
import { Loading, NoContentFound } from '../../../components/ui/content';
import { TextFieldWithIconCustom } from '../../../components/custom';
import { IPayment } from '../../../interfaces';
import { PagosList } from '../../../components/client/pagos';
import { baseUrl } from '../../../common';


export const BusquedaPago = () => {

    const [search, setSearch] = useState<string>('');
    const [payments, setPayments] = useState<IPayment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { authState } = useContext(AuthContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const getActivePayments = async () => {
        setLoading(true);
        const url = `${baseUrl}/payment`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setPayments(data);
            setLoading(false);
        } catch (error) {
            console.log({ error });

            setLoading(false);
        }
    }
    useEffect(() => {
        getActivePayments();
    }, []);

    return (
        <>
            {loading && (<Loading />)}
            {!loading && payments && (

                <Box sx={{ mt: 2, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap', width: '100%' }}>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextFieldWithIconCustom label='Filtrar pagos' value={search} onChange={(e) => setSearch(e.target.value)}>
                            <IconButton type='submit'>
                                <SearchRounded sx={{ color: 'rgba(100,100,100)' }} />
                            </IconButton>
                        </TextFieldWithIconCustom>
                    </form>
                    {!loading && payments.length === 0 && (<NoContentFound title='No se encontraron pagos' text='No hay pagos a tu nombre hasta los momentos...' />)}
                    {payments && (<PagosList payments={payments} />)}
                </Box>
            )}
        </>
    )
}

