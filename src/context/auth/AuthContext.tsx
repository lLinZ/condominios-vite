import { createContext } from 'react'
import { IRole, IUser } from '../../interfaces';

interface ContextResponse {
    status: boolean;
    message: string;
    user?: IUser;
    role?: IRole;
}

interface AuthContextProps {
    authState: IUser;
    userLogin: (email: string, password: string) => Promise<ContextResponse>;
    userLogout: () => Promise<ContextResponse>;
    editData: (email?: string, telefono?: string, password?: string, confirmarPassword?: string) => Promise<ContextResponse>;
    changeColor: (color: string) => Promise<ContextResponse>;
}
export const AuthContext = createContext({} as AuthContextProps);