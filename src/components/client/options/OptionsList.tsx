import Grid from '@mui/material/Grid'
import React from 'react'
import MapsHomeWorkRounded from '@mui/icons-material/MapsHomeWorkRounded';
import RequestQuoteRounded from '@mui/icons-material/RequestQuoteRounded'
import PictureAsPdfRounded from '@mui/icons-material/PictureAsPdfRounded';
import ArticleRounded from '@mui/icons-material/ArticleRounded';
import { OptionWidget } from './';
import { useTheme } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';

export type ClientOption = {
    text: string;
    icon: React.ReactNode;
    color: string;
    path: string;
}
export const OptionsList = () => {
    const theme = useTheme();
    const clientOptions: ClientOption[] = [
        { text: 'Pagos', icon: <RequestQuoteRounded />, color: green[400], path: '/pagos' },
        { text: 'Unidades', icon: <MapsHomeWorkRounded />, color: blue[300], path: '/unidades' },
        { text: 'Documentos', icon: <ArticleRounded />, color: orange[300], path: '/documentos' },
        { text: 'Reportes', icon: <PictureAsPdfRounded />, color: red[400], path: '/reportes' },
    ]


    return (
        <Grid container display='flex' alignItems='center' justifyContent='space-between' spacing={1} sx={{ padding: 2 }}>
            {clientOptions.map((option) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={option.text}>
                    <OptionWidget option={option} />
                </Grid>
            ))}
        </Grid >
    )
}