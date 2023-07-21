import { useState, useContext } from "react";
import { Box, Chip, IconButton } from "@mui/material";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";

import Swal from "sweetalert2";

import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { ImageDialog } from "../../client/pagos";
import { TypographyCustom } from "../../custom";
import { errorArrayLaravelTransformToString, getFormatDistanceToNow } from "../../../helpers/functions";
import { IPayment } from "../../../interfaces";

interface Props {
    payment: IPayment;
}
export const PaymentItem = ({ payment }: Props) => {
    const [paymentState, setPaymentState] = useState<IPayment | null>(payment);
    const { authState } = useContext(AuthContext);

    const declinePayment = async () => {
        const url = `${baseUrl}/payment/decline/${paymentState?.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setPaymentState(data as IPayment);
                    Swal.fire({
                        text: 'Pago aprobado',
                        icon: 'success',
                        toast: true,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                        },
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'bottom-start'
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
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'El pago no existe, revise el pago que esta intentando actualizar',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
    const approvePayment = async () => {
        const url = `${baseUrl}/payment/approve/${paymentState?.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    // const { data } = await response.json();
                    setPaymentState(null);
                    Swal.fire({
                        text: 'Pago aprobado',
                        icon: 'success',
                        toast: true,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                        },
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'bottom-start'
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
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'El pago no existe, revise el pago que esta intentando actualizar',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
    return (paymentState ? (
        <Box sx={{ width: '100%', mb: 1, mt: 1, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2 }}>
            <Chip size='small' color={paymentState.status?.description === 'Pendiente' ? 'warning' : 'error'} label={paymentState.status?.description ? paymentState.status?.description : ''} />
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <TypographyCustom variant='h6' fontWeight='bold'>{paymentState.description}</TypographyCustom>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.secondary'>Monto</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{paymentState.amount}</TypographyCustom>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.secondary'>Tipo</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{paymentState.payment_type}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.disabled' fontmode={2}>{getFormatDistanceToNow(new Date(paymentState.created_at))}</TypographyCustom>
                </Box>
                <ImageDialog image={paymentState.image ? paymentState.image : ''} />
            </Box>
            <Box sx={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                <IconButton color='success' onClick={approvePayment}>
                    <CheckCircleRounded />
                </IconButton>
                <IconButton color='error' onClick={declinePayment}>
                    <CancelRounded />
                </IconButton>
            </Box>
        </Box>) : <></>
    )
}

