import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography';

export function TypographyCustom<C extends React.ElementType>(
    props: TypographyProps<C, { component?: C, fontmode?: number }>
) {
    const { children, ...rest } = props;

    let mode = '1'
    mode = !rest.fontmode ? mode : String(rest.fontmode);
    const fontFamilyHash: any = {
        '1': 'Geologica',
        '2': 'Noto Sans Warang Citi',
        '3': 'Open Sans',
        '4': 'Ubuntu',
    }
    return <Typography sx={{ fontFamily: fontFamilyHash[mode] }} {...rest}>{children}</Typography>;
}