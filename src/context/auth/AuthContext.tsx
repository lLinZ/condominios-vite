import { createContext } from 'react'
import { IRole, IUser } from '../../interfaces';
interface AuthContextProps {
    authState: IUser;
    userLogin: (email: string, password: string) => Promise<{ status: boolean; user?: IUser; message: string; role?: IRole; }>;
    userLogout: () => boolean;
    editData: (email?: string, telefono?: string, password?: string, confirmarPassword?: string) => Promise<{ status: boolean, message: string }>;
    changeColor: (color: string) => Promise<{ status: boolean, message: string }>;
}
export const AuthContext = createContext({} as AuthContextProps);