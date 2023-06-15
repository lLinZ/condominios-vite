import Button, { ButtonProps } from "@mui/material/Button";
import { darken, useTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { green } from "@mui/material/colors";

export function ButtonCustom<C extends React.ElementType>(
    props: ButtonProps<C, { component?: C }>
) {
    const { children, ...rest } = props;
    const { authState } = useContext(AuthContext);
    const theme = useTheme();
    return <Button fullWidth disableElevation sx={{
        fontFamily: 'Geologica', borderRadius: '10em', textTransform: 'none', p: 1.8, background: authState ? authState.color : green[500], color: theme.palette.getContrastText(authState ? authState.color : green[500]),
        '&:hover': {
            background: darken(authState ? authState.color : green[500], 0.5),
            color: theme.palette.getContrastText(darken(authState ? authState.color : green[500], 0.5)),

        }
    }} {...rest} >{children}</Button>;
}