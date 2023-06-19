import { Form, Formik, FormikState } from "formik"
import { Layout } from "../../../components/ui"
import { DescripcionDeVista } from "../../../components/ui/content/DescripcionDeVista"
import { ButtonCustom, SelectCustom, TextFieldCustom } from "../../../components/custom"
import Grid from "@mui/material/Grid"
import AttachmentRounded from "@mui/icons-material/AttachFileRounded"
import { MenuItem } from "@mui/material"
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { useState } from "react"

const initialValues = {
    banco: '',
    monto: 0,
    tipo_de_moneda: '0',
    tipo_de_pago: '0',
    descripcion: '',
}
type FormValues = {
    banco: string;
    monto: number;
    tipo_de_moneda: string;
    tipo_de_pago: string;
    descripcion: string;
}
export const RegistrarPago = () => {
    const [image, setImage] = useState<File | number | null>(null);
    const onSubmit = async (values: FormValues, resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void) => {
        if (!values.tipo_de_pago) return false;

        switch (values.tipo_de_pago) {
            case '2':
                break;
        }

    }

    const attachFile = () => {

    }
    return (
        <Layout>
            <DescripcionDeVista title='Registrar pago' description='Registra un nuevo pago para tu condominio' />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={1} display='flex' flexDirection='row' alignItems='center' sx={{ p: { xs: 1, sm: 0 } }}>
                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom labelId='tipo_de_moneda' label="Tipo de moneda" onChange={handleChange} name="tipo_de_moneda" value={values.tipo_de_moneda}>
                                    <MenuItem value={'0'} disabled>Seleccione una moneda</MenuItem>
                                    <MenuItem value={'Dolar'}>Dolar</MenuItem>
                                    <MenuItem value={'Bolivares'}>Bolivares</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom labelId='tipo_de_pago' label="Tipo de moneda" onChange={handleChange} name="tipo_de_pago" value={values.tipo_de_pago}>
                                    <MenuItem value={'0'} disabled>Seleccione un tipo de pago</MenuItem>
                                    <MenuItem value={'Transferencia'}>Transferencia</MenuItem>
                                    <MenuItem value={'Efectivo'}>Efectivo</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextFieldCustom onChange={handleChange} name='monto' label='Monto' value={Number(values.monto)} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <ButtonCustom variant='outlined' type='button' startIcon={image ? <SwapHorizRoundedIcon /> : <AttachmentRounded />} onClick={attachFile}>{image ? 'Cambiar imagen' : 'Adjuntar imagen'}</ButtonCustom>
                                <input type='file' accept="image/*" style={{ display: 'none' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom multiline onChange={handleChange} name='descripcion' label='Descripción' value={values.descripcion} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Finalizar</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}