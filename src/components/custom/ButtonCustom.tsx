import Button, { ButtonProps } from "@mui/material/Button";
import { lighten, darken, useTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export function ButtonCustom<C extends React.ElementType>(
    props: ButtonProps<C, { component?: C }>
) {
    const { children, ...rest } = props;
    const { authState } = useContext(AuthContext);
    const theme = useTheme();
    return <Button fullWidth disableElevation sx={{
        fontFamily: 'Geologica',
        borderRadius: '10em',
        textTransform: 'none',
        p: 1.8,
        background: rest.variant && rest.variant === 'outlined' ? 'transparent' : authState.color,
        borderColor: authState.color,
        color: theme.palette.getContrastText(rest.variant && rest.variant === 'outlined' ? '#FFF' : authState.color),
        '&:hover': {
            borderColor: authState.color,
            background:
                rest.variant && rest.variant
                    ? lighten(authState.color, 0.5)
                    : darken(authState.color, 0.5)
            ,
            color: theme.palette.getContrastText(
                rest.variant && rest.variant
                    ? lighten(authState.color, 0.5)
                    : darken(authState.color, 0.5)
            )
        }
    }} {...rest} >{children}</Button>;
}