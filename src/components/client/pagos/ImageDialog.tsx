import { FC, useState } from "react"

import { Box, Dialog, Toolbar, IconButton } from "@mui/material"
import CloseRounded from "@mui/icons-material/CloseRounded"
import { grey } from "@mui/material/colors"

import { imageUrl } from "../../../common"
import { TypographyCustom } from "../../custom"

interface Props {
    image: string;
}
export const ImageDialog: FC<Props> = ({ image }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleClose = () => {
        setOpenModal(false);
    }
    return (
        <>
            <Box sx={styles.main} onClick={() => setOpenModal(true)}>
                <img src={`${imageUrl + image}`} width={10} height={10} style={{ width: 100, height: 100, objectFit: 'fill', display: 'block' }} />
            </Box>
            <Dialog open={openModal} fullScreen>
                <Toolbar sx={styles.toolbar}>
                    <Box sx={styles.toolbarBox}>
                        <TypographyCustom sx={{ color: "common.white" }} variant='h5'>Imagen del pago</TypographyCustom>
                        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Box sx={styles.dialogMain} onClick={() => setOpenModal(true)}>
                    <Box sx={styles.dialogImage}>
                        <img src={`${imageUrl + image}`} alt="Imagen de pago" style={styles.fullsizeImg} />
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}
const styles = {
    main: { width: 100, height: 100, borderRadius: 5, overflow: 'hidden', '&:hover': { cursor: 'pointer' } },
    toolbar: { background: grey[900] },
    toolbarBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    dialogMain: { marginBlock: 5, marginInline: 'auto', width: '100%', minHeight: '100vh', borderRadius: 5, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    dialogImage: { marginBlock: 5, marginInline: 'auto', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' },
    fullsizeImg: { width: '100%', display: 'block' },
}