import { useContext } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AuthContext } from '../../context/auth';

export function TextFieldCustom(
    props: TextFieldProps
) {
    const { children, ...rest } = props;

    const { authState } = useContext(AuthContext)
    return <TextField fullWidth sx={{
        '& input': {
            fontFamily: 'Noto Sans Warang Citi',
        },
        '& fieldset': {
            borderRadius: 10,
            fontFamily: 'Noto Sans Warang Citi',
        },
        '& label.Mui-focused': {
            color: authState.color,
        },
        '& label': {
            fontFamily: 'Noto Sans Warang Citi'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: authState.color,
            },
        },
    }
    } {...rest} />;
}