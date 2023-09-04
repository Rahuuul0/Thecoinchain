import React from 'react'
import { useEffect } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import { academyActions } from "../../_actions";
import { academyAtom } from "../../_state";
import { useRecoilValue } from 'recoil';
import ReactHtmlParser from 'react-html-parser';

const AcademyAboutCrypto = () => {
    const academyActionsList = academyActions();
    const allAbout = useRecoilValue(academyAtom);

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit"  >
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            All About Crypto
        </Typography>,
    ];

    //Academy Api
    useEffect(() => {
        let response = academyActionsList.academyGetList();
        response.then((res) => { (res) })
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 1, left: 1, behavior: "smooth" })
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='community-wrapper subscription-wrapper bredcrum-div'>
                    <Box sx={{ color: '#777E90', fontWeight: '500', }}>
                    <Container maxWidth="lg">
                            <Breadcrumbs
                                separator={<NavigateNext fontSize="small" />}
                                aria-label="breadcrumb"
                                className='right-breadcrum'
                            >
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Container>
                    </Box>
                    {allAbout?.map((items) => {
                        let title = items.title;
                        let description = items.description;
                        return (
                            <Container maxWidth="lg">
                                <Box className='subscription-wrapper-head'>
                                    <Typography component="h2" variant='h2'>
                                        {title}
                                    </Typography>
                                </Box>
                                <Box className='page-inner'>
                                    <Typography component="p" variant='body2'>
                                        {ReactHtmlParser(description)}
                                    </Typography>
                                </Box>
                            </Container>
                        )
                    })}
                </Box>


            </ThemeProvider>
        </>
    )
}

export default AcademyAboutCrypto;
