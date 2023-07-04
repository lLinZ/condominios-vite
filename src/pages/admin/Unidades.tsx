
import { Form, Formik, FormikState, FormikValues } from 'formik'
import { ButtonCustom, SelectCustom, TypographyCustom } from '../../components/custom'
import { Layout } from '../../components/ui'
import { DescripcionDeVista } from '../../components/ui/content'
import { IBuilding, IUnit } from '../../interfaces'
import Grid from '@mui/material/Grid'
import { baseUrl } from '../../common'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import MenuItem from '@mui/material/MenuItem'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { errorArrayLaravelTransformToString } from '../../helpers/functions'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import EditRounded from '@mui/icons-material/EditRounded'

const initialValues = {
    building_id: 'default',
}
export const Unidades = () => {
    const [buildings, setBuildings] = useState<IBuilding[] | null>(null);
    const [units, setUnits] = useState<IUnit[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext);
    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<{ building_id: string; }>> | undefined) => void) => {
        const url = `${baseUrl}/buildings/units/${values.building_id}`;

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            setLoading(true);
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnits(data)

                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        html: 'No se logro conseguir unidades del edificio',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                html: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } finally {
            setLoading(false);
        }
    }
    const getBuildings = async () => {
        const url = `${baseUrl}/buildings`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json()
                    setBuildings(data);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        getBuildings();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista description='Aqui veras las unidades del edificio seleccionado' title='Unidades' />
            <Formik
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                initialValues={initialValues}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <SelectCustom
                                    error={errors.building_id && touched.building_id ? true : false}
                                    helpertext={errors.building_id && touched.building_id ? errors.building_id : ''}
                                    name='building_id'
                                    label='Edificios'
                                    onChange={handleChange}
                                    value={values.building_id}
                                >
                                    <MenuItem value={'default'} disabled>Seleccione un edificio</MenuItem>
                                    {buildings && buildings.map((building) => (
                                        <MenuItem key={building.id} value={building.id}>{building.name}</MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit' endIcon={<SearchRounded />}>Buscar unidades</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            {units && units.map((unit) => (
                <Box key={unit.id} sx={{ borderRadius: 3, p: 2, mt: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)' }}>
                    <TypographyCustom variant={'subtitle2'}>{unit.name}</TypographyCustom>
                    <TypographyCustom variant={'subtitle2'}>Tipo de unidad</TypographyCustom>
                    <TypographyCustom variant={'h6'}>{unit.unit_type.description}</TypographyCustom>

                    <TypographyCustom variant={'subtitle2'}>{unit.name}</TypographyCustom>
                    <IconButton><EditRounded /></IconButton>
                </Box>
            ))}
            {loading &&
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            }
        </Layout>
    )
}