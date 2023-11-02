import React from 'react'
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import { useFooterActions } from '../../_actions';
import { PrivacyListAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import ReactHtmlParser from 'react-html-parser';

const PrivacyPolicy = () => {

    const privacyActions = useFooterActions();
    const DisclaimersList = useRecoilValue(PrivacyListAtom);

    useEffect(() => {
        const response = privacyActions.PrivacyList();
        response.then((res) => { (res) })
    }, []);

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Privacy Policy
        </Typography>,
    ];
    useEffect(() => { window.scrollTo({ top: 1, left: 1, behavior: "smooth" }) });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='extra-wrapper subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                <Container maxWidth="lg"> 
                    <Box className='right-breadcrum ol' sx={{ color: '#777E90', fontWeight: '500', }}>
                        <Box>
                            <Breadcrumbs
                                separator={<NavigateNext fontSize="small" />}
                                aria-label="breadcrumb"
                                className='center-breadcrum'
                            >
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Box>
                    </Box>  
                    {DisclaimersList?.map((items) => {
                            let title = items.title;
                            let description = items.description;
                            return(
                                <>
                                <Box className='subscription-wrapper-head'>
                                    <Typography component="h2" variant='h2'>
                                        {title}
                                    </Typography> 
                                </Box>
                                <Box>
                                    <Container maxWidth="lg">
                                        <Box>
                                            <Typography component='p' variant='p' paddingTop={1}>
                                                {ReactHtmlParser(description)}
                                            </Typography>
                                        </Box>
                                    </Container>
                                </Box>
                                </>
                            )
                    })}
                </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}


export default PrivacyPolicy
