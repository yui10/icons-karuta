import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <AppBar component="header" position="static" sx={{ marginTop: 'auto', backgroundColor: '#0F0F0F' }}>
            <Toolbar>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Icons Karuta
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
