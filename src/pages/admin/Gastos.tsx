import { Box } from "@mui/material"
import { red, amber } from "@mui/material/colors"
import { useContext } from "react"
import { OptionsList } from "../../components/ui/options"
import { TypographyCustom } from "../../components/custom"
import { Layout } from "../../components/ui"
import { AuthContext } from "../../context/auth"
import { Option } from '../../interfaces';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongRounded';
import { DescripcionDeVista } from "../../components/ui/content"
export const Gastos = () => {
    const context = useContext(AuthContext)
    const clientOptions: Option[] = [
        { text: 'Gastos Comunes', icon: <ReceiptLongIcon />, color: amber[400], path: '/admin/gastos/comunes' },
        { text: 'Gastos No Comunes', icon: <ReceiptLongIcon />, color: red[400], path: '/admin/gastos/nocomunes' },
    ]
    return (
        <Layout>
            <DescripcionDeVista description='Selecciona un tipo de gasto' title="Gastos" />
            <OptionsList options={clientOptions} breakpoints={{ xs: 6 }} />
            <Box sx={styles.contentContainer}>
                <TypographyCustom variant='h6' fontWeight='bold'>Debe seleccionar un tipo de gasto</TypographyCustom>
            </Box>
        </Layout>
    )
}

const styles = {
    nameContainer: {
        borderRadius: 3,
        marginBottom: 2,
        padding: 2
    },
    contentContainer: {
        margin: 0,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}