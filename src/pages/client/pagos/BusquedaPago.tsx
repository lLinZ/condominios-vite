import SearchRounded from '@mui/icons-material/SearchRounded'
import { IconButton } from '@mui/material'
import { TextFieldWithIconCustom } from '../../../components/custom'
import { useState } from 'react'

export const BusquedaPago = () => {

    const [search, setSearch] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return false;

        alert('buscando');
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextFieldWithIconCustom label='Buscar Pago' value={search} onChange={(e) => setSearch(e.target.value)}>
                    <IconButton type='submit'>
                        <SearchRounded sx={{ color: 'rgba(100,100,100)' }} />
                    </IconButton>
                </TextFieldWithIconCustom>
            </form>

        </>
    )
}