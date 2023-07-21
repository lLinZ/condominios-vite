import { useState, useContext } from "react";

import EditRounded from "@mui/icons-material/EditRounded";
import { Box, Chip, IconButton } from "@mui/material";

import Swal from "sweetalert2";

import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";
import { IUnit } from "../../../interfaces";
import { TypographyCustom } from "../../custom";
import { OwnerDialog, SelectedUnitType, SelectedUser, UnitTypeDialog } from ".";

interface Props {
    unit: IUnit;
}
export const UnitItem = ({ unit }: Props) => {
    const [unitState, setUnitState] = useState<IUnit>(unit);

    const { authState } = useContext(AuthContext);
    const asignOwner = async (selectedUser: SelectedUser) => {
        const url = `${baseUrl}/unit/${unitState.id}/user/${selectedUser?.id}`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitState({
                        ...unitState,
                        user_id: data.id,
                        user: data
                    })
                    Swal.fire({
                        text: 'Propietario asignado',
                        icon: 'success',
                        toast: true,
                        position: 'bottom-start',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                            container: 'custom-swal-container',
                        }
                    })
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
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal-container',
                }
            })
        }
    }
    const asignUnitType = async (selectedUnitType: SelectedUnitType) => {
        const url = `${baseUrl}/unit/${unitState.id}/unit_type/${selectedUnitType?.id}`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitState({
                        ...unitState,
                        unit_type_id: data.id,
                        unit_type: data
                    })
                    Swal.fire({
                        text: 'Propietario asignado',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        iconColor: '#FFF',
                        toast: true,
                        position: 'bottom-start',
                        customClass: {
                            popup: 'colored-toast',
                            container: 'custom-swal-container',
                        }
                    })
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
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal-container',
                }
            })
        }
    }

    return (
        <Box sx={{ borderRadius: 3, p: 2, mt: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)' }}>
            <Box>
                <Chip size='small' color={unitState.status?.description === 'Activo' ? 'primary' : 'default'} label={unitState.status?.description} sx={{ width: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
                <TypographyCustom variant={'h6'} fontWeight='bold'>{unitState.name}</TypographyCustom>
                <TypographyCustom variant={'subtitle1'} fontWeight={'bold'} color="text.disabled">Tipo de unidad</TypographyCustom>
                <TypographyCustom variant={'subtitle2'} fontWeight={'bold'} color={unitState.unit_type ? 'text.primary' : 'text.secondary'}>{unitState.unit_type ? unitState.unit_type.description : 'No hay tipo de unidad asignado'}</TypographyCustom>
                <UnitTypeDialog asignUnitType={asignUnitType} unit={unitState} />
                <TypographyCustom variant={'subtitle1'} fontWeight={'bold'} color="text.disabled">Propietario</TypographyCustom>
                <TypographyCustom variant={'subtitle2'} fontWeight={'bold'} color={unitState.user ? 'text.primary' : 'text.secondary'}>{unitState.user ? unitState.user.nombre : 'No hay propietario asignado'}</TypographyCustom>
                <OwnerDialog asignOwner={asignOwner} unit={unitState} />
            </Box>
        </Box>
    )
}