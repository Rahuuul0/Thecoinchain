import React from 'react'
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Link, Breadcrumbs } from '@mui/material';
import NoData from "../../../public/assets/images/no_data.svg";

const ContentNotFound = () => {

   
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) });
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='' sx={{ mt: 12 }}>
                    <Container maxWidth="lg">
                        <Box textAlign='center' padding={3}>
                      <img src={NoData} width='200'/>
                      <Typography paddingY={3} variant='h4' component='h4'>Sorry! What you searching not found</Typography>
                      </Box>
                    </Container>
                </Box >
            </ThemeProvider >
        </>
    )
}

export default ContentNotFound
