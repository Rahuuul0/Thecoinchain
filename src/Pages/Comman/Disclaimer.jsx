import { Container, Typography, Box, Breadcrumbs, } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { NavigateNext } from '@mui/icons-material/';
import { useFooterActions } from '../../_actions';
import { DisclaimersListAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import ReactHtmlParser from 'react-html-parser';


const Disclaimer = () => {

    const DisclaimersActions = useFooterActions();
    const DisclaimersList = useRecoilValue(DisclaimersListAtom);

    useEffect(() => {
        const response = DisclaimersActions.DisclaimersList();
        response.then((res) => { (res) })
    }, []);

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary" sx={{ m: "0!important" }}>
            Disclaimer
        </Typography>,
    ];
    useEffect(() => { window.scrollTo({ top: 1, left: 1, behavior: "smooth" }) });

    return (
        <>
            <Box component="main" className='extra-wrapper subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                <Box className='subscription-wrapper-head'>
                    <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                        <Box >
                            <Breadcrumbs
                                separator={<NavigateNext fontSize="small" />}
                                aria-label="breadcrumb"
                                className='center-breadcrum'
                            >
                                {breadcrumbs}
                            </Breadcrumbs>

                        </Box>
                    </Box>
                </Box>
                {DisclaimersList?.map((items) => {
                    let title = items.title;
                    let description = items.description;
                    return (
                        <Container maxWidth="lg">
                            <Typography component="h2" variant='h2'>
                                {title}
                            </Typography>
                            <Typography variant='body2' component="p">
                                {ReactHtmlParser(description)}
                            </Typography>
                        </Container>
                    )
                })}
            </Box >
        </>
    )
}

export default Disclaimer

