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
import Leveragedv2 from "../../../public/assets/images/leveragedv2.svg";
const AcademyAboutCrypto = () => {
    const academyActionsList = academyActions();
    const allAbout = useRecoilValue(academyAtom);

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit"  >
            Home
        </Link>,
        <Typography  key="3" color="text.primary" sx={{ m: "0!important" }}>
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

    console.log(allAbout,'allAbout')
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='community-wrapper subscription-wrapper bredcrum-div' >
                    <Container maxWidth="lg">
                        <Box className='right-breadcrum ol community-class' sx={{ color: '#777E90', fontWeight: '500' }}>
                            <Box  className='about-bread'>
                                <Breadcrumbs
                                    separator={<NavigateNext fontSize="small" />}
                                    aria-label="breadcrumb"
                                    className='center-breadcrum'
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>

                            </Box>
                        </Box>
                        {allAbout?.map((items) => {
                            let title = items.title;
                            let description = items.description;
                            let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}`:items.image_link;
                            return (
                            <>
                                <Box className='subscription-wrapper-head'>
                                    <Typography component="h2" variant='h2'>
                                        {title}
                                    </Typography>
                                </Box>
                                <Box className='page-inner'>
                                    {image == null || image == ''? " " : <img src={image} alt='' />}       
                                    <Typography component="p" variant='body2'>
                                        {ReactHtmlParser(description)}
                                    </Typography>
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

export default AcademyAboutCrypto;
