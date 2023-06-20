import NumberFormat from 'react-number-format';
import { Form, Formik, FormikState } from 'formik'
import { ChangeEvent, useRef, useState } from 'react'
import { Layout } from '../../../components/ui'
import { DescripcionDeVista } from '../../../components/ui/content/DescripcionDeVista'
import { ButtonCustom, SelectCustom, TextFieldCustom, TypographyCustom } from '../../../components/custom'
import Grid from '@mui/material/Grid'
import AttachmentRounded from '@mui/icons-material/AttachFileRounded'
import { MenuItem } from '@mui/material'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import * as Yup from 'yup';
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

const validationSchema = Yup.object({
    monto: Yup.string().matches(/^[\,0-9\.]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1),
    banco: Yup.string().required('Este campo es obligatorio'),
    tipo_de_moneda: Yup.string().required('Este campo es obligatorio'),
    tipo_de_pago: Yup.string().required('Este campo es obligatorio'),
    descripcion: Yup.string().required('Este campo es obligatorio'),
})
export const RegistrarPago = () => {
    const [image, setImage] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmit = async (values: FormValues, resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void) => {
        if (!values.tipo_de_pago) return false;

        switch (values.tipo_de_pago) {
            case '2':
                break;
        }
        resetForm()

    }

    const attachFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        setImage(file);
    }

    const handleClick = () => {
        inputRef.current?.click();
    }
    return (
        <Layout>
            <DescripcionDeVista title='Registrar pago' description='Registra un nuevo pago para tu condominio' />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} display='flex' flexDirection='row' alignItems='center' sx={{ p: { xs: 1, sm: 0 } }}>

                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom labelId='tipo_de_moneda' label='Tipo de moneda' onChange={handleChange} name='tipo_de_moneda' value={values.tipo_de_moneda}>
                                    <MenuItem value={'0'} disabled>Seleccione una moneda</MenuItem>
                                    <MenuItem value={'Dolar'}>Dolar</MenuItem>
                                    <MenuItem value={'Bolivares'}>Bolivares</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom labelId='tipo_de_pago' label='Tipo de moneda' onChange={handleChange} name='tipo_de_pago' value={values.tipo_de_pago}>
                                    <MenuItem value={'0'} disabled>Seleccione un tipo de pago</MenuItem>
                                    <MenuItem value={'Transferencia'}>Transferencia</MenuItem>
                                    <MenuItem value={'Efectivo'}>Efectivo</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <NumberFormat
                                    name='monto'
                                    label='Monto'
                                    value={values.monto}
                                    customInput={TextFieldCustom}
                                    thousandSeparator={true}
                                    decimalSeparator='.'
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    prefix=''
                                    renderText={(value: any) => <TextFieldCustom onChange={handleChange} value={value} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <ButtonCustom variant='outlined' type='button' startIcon={image ? <SwapHorizRoundedIcon /> : <AttachmentRounded />} onClick={handleClick}>{image ? 'Cambiar imagen' : 'Adjuntar imagen'}</ButtonCustom>
                                <input type='file' accept='image/*' ref={inputRef} style={{ display: 'none' }} onChange={attachFile} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldCustom error={errors.descripcion && touched.descripcion ? true : false} helperText={errors.descripcion} multiline onChange={handleChange} name='descripcion' label='Descripción' value={values.descripcion} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Finalizar</ButtonCustom>
                            </Grid>
                            {image && (
                                <Grid item xs={12} sm={6}>
                                    <TypographyCustom fontWeight={'bold'} color='text.secondary'>Previsualizacion de la imagen</TypographyCustom>
                                    <img src={URL.createObjectURL(image)} width={'50%'} height={'auto'} />
                                </Grid>
                            )}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}