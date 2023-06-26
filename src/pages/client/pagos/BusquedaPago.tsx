import { useContext, useEffect, useState, Dispatch, ChangeEvent, FormEventHandler, FormEvent } from 'react';

import { Box, IconButton } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';

import { AuthContext } from '../../../context/auth';
import { Loading, NoContentFound } from '../../../components/ui/content';
import { TextFieldWithIconCustom } from '../../../components/custom';
import { IPayment } from '../../../interfaces';
import { PagosList } from '../../../components/client/pagos';
import { baseUrl } from '../../../common';
import Swal from 'sweetalert2';


export const BusquedaPago = () => {
    const [payments, setPayments] = useState<IPayment[] | null>(null);
    const { authState } = useContext(AuthContext)
    const getActivePayments = async () => {
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
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        getActivePayments();
    }, []);

    return (
        <>
            <BusquedaYResultados records={payments} setRecords={setPayments} getInitialRecords={getActivePayments} />
            {payments && (<PagosList payments={payments} />)}
        </>

    )
}
interface Props {
    getInitialRecords: () => void;
    records: any;
    setRecords: Dispatch<any>;

}
const BusquedaYResultados = (props: Props) => {
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        props.getInitialRecords();
    }, [])
    function searchValue(nameKey: any, myArray: any) {
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].find(nameKey)) {
                return myArray[i];
            }
        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        const result: any = searchValue(search, props.records);
        console.log({ result });
        if (result.length > 0) {
            setSearch('');
            props.setRecords(result);
        } else {
            Swal.fire({
                title: 'Oops...',
                text: 'No se encontraron resultados',
                icon: 'warning',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }
    return (
        <>
            {props.records === 'loading' && (<Loading />)}
            {props.records !== 'loading' && props.records && (

                <Box sx={{ mt: 2, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column wrap', width: '100%' }}>
                    <form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
                        <TextFieldWithIconCustom label='Filtrar pagos' value={search} onChange={(e) => setSearch(e.target.value)}>
                            <IconButton type='submit'>
                                <SearchRounded sx={{ color: 'rgba(100,100,100)' }} />
                            </IconButton>
                        </TextFieldWithIconCustom>
                    </form>
                    {!props.records && (<NoContentFound title='No se encontraron pagos' text='No hay pagos a tu nombre hasta los momentos...' />)}
                </Box>
            )}
        </>
    )
}
