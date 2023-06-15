import React, { FC, useReducer, useState } from 'react'
import { AUTH_ACTIONS, AuthContext, USER_ACTIONS, authReducer } from './'
import { IRole, IUser } from '../../interfaces';
import { baseUrl } from '../../common';
import { green } from '@mui/material/colors';

type Props = {
    children: React.ReactNode;
}
const initialState: IUser = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    role_id: 0,
    status_id: 0,
    created_at: '',
    color: green[500],
    logged: false,
}
export const AuthProvider: FC<Props> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);


    const userLogout = () => {
        dispatch({ type: AUTH_ACTIONS.logout, payload: initialState });
        return true;
    }

    const userLogin: (email: string, password: string) => Promise<{ status: boolean; user?: IUser; message: string; role?: IRole; }> = async (email, password) => {

        if (!email || !password) return { status: false, message: 'Campos vacios' };

        const url = `${baseUrl}/login`
        const body = new URLSearchParams({
            'email': email,
            'password': password,
        });
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, user, message } = await response.json();
                    dispatch({ type: AUTH_ACTIONS.login, payload: user });
                    return { status, user, message, role: user.role };

                case 400:
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                    break;

                default:
                    return { status: false, message: 'Ocurrio un error en el servidor', response };
                    break;
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    const editData = async (email?: string, telefono?: string, password?: string, confirmarPassword?: string) => {
        if (!email && !telefono && !password && !confirmarPassword) {
            return { status: false, message: 'No se ingresaron datos' };
        }

        let bodyAppend = {};

        // Validar password
        if (password) {
            if (!confirmarPassword) return { status: false, message: 'Debe confirmar la contraseña' };
            if (confirmarPassword !== password) return { status: false, message: 'Las contraseñas deben coincidir' };
            bodyAppend = {
                ...bodyAppend,
                'password': password
            }
        }

        // Validar email
        if (email) {
            bodyAppend = {
                ...bodyAppend,
                'email': email
            }
        }

        // Validar telefono
        if (telefono) {
            bodyAppend = {
                ...bodyAppend,
                'telefono': telefono
            }
        }

        const url = `${baseUrl}/user/edit/${authState.id}`
        const body = new URLSearchParams(bodyAppend);
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, message, user } = await response.json();
                    console.log({ status, message })
                    dispatch({ type: USER_ACTIONS.edit, payload: { user } })
                    return { status, message };

                case 400:
                    console.log({ status, message })
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                    break;

                default:
                    console.log({ response })
                    return { status: false, message: 'Ocurrio un error en el servidor' };
                    break;
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    const changeColor = async (color: string) => {
        if (!color) return { status: false, message: 'Falta el color' };

        const url = `${baseUrl}/user/edit/${authState.id}/color`
        const body = new URLSearchParams({
            'color': color,
        });
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, message } = await response.json();
                    console.log({ status, message })
                    dispatch({ type: USER_ACTIONS.color, payload: { color } })
                    return { status, message };

                case 400:
                    console.log({ status, message })
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                    break;

                default:
                    console.log({ response })
                    return { status: false, message: 'Ocurrio un error en el servidor' };
                    break;
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    return (
        <AuthContext.Provider value={{ authState, userLogin, userLogout, changeColor, editData }}>
            {children}
        </AuthContext.Provider>
    )
}