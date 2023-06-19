import SearchRounded from '@mui/icons-material/SearchRounded'
import { Box, IconButton } from '@mui/material'
import { TextFieldWithIconCustom, TypographyCustom } from '../../../components/custom'
import { useEffect, useState } from 'react'
import { IPayment } from '../../../interfaces'
import { baseUrl } from '../../../common'
import { getFormatDistanceToNow } from '../../../helpers/functions'

export const BusquedaPago = () => {

    const [search, setSearch] = useState<string>('');
    const [payments, setPayments] = useState<IPayment[] | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return false;

        alert('buscando');
    }
    const getActivePayments = async () => {
        const url = `${baseUrl}/payment`;
        try {
            const response = await fetch(url);
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
            <form onSubmit={handleSubmit}>
                <TextFieldWithIconCustom label='Buscar Pago' value={search} onChange={(e) => setSearch(e.target.value)}>
                    <IconButton type='submit'>
                        <SearchRounded sx={{ color: 'rgba(100,100,100)' }} />
                    </IconButton>
                </TextFieldWithIconCustom>
            </form>
            {payments && payments.map((payment) => (
                <Box key={payment.id} sx={{ width: '100%', height: 100, p: 2 }}>
                    <TypographyCustom color="text.secondary">
                        {payment.description}
                    </TypographyCustom>
                    <TypographyCustom color="text.primary" variant="h5" fontWeight="bold">
                        {payment.amount} {payment.currency === 'Dolares' ? '$' : 'Bs'}
                    </TypographyCustom>
                    <TypographyCustom color="text.primary" variant="h5" fontWeight="bold">
                        {getFormatDistanceToNow(new Date(payment.created_at))}
                    </TypographyCustom>
                </Box>
            ))}
        </>
    )
}