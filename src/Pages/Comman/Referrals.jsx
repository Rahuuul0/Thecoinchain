import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"

const Referrals = () => {
    return (
        <>
        <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box component="main">
        <Box component="div" className='hero-section' sx={{ py: 6 }}></Box>
        </Box>
        </ThemeProvider>
        </>
    )
}

export default Referrals