import { useContext } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AuthContext } from '../../context/auth';
import { green } from '@mui/material/colors';

export function TextFieldCustom(
    props: TextFieldProps
) {
    const { children, ...rest } = props;

    const { authState } = useContext(AuthContext)
    return <TextField fullWidth sx={{
        '& input': {
            fontFamily: 'Noto Sans Warang Citi',
        },
        '& fieldset': { borderRadius: '10em', fontFamily: 'Noto Sans Warang Citi', },
        '& label.Mui-focused': {
            color: authState ? authState.color : green[500],
        },
        '& label': {
            fontFamily: 'Noto Sans Warang Citi'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: authState ? authState.color : green[500],
            },
        },
    }
    } {...rest} />;
}