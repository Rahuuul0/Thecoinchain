import React from 'react'
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import BTCIc from "../../../public/assets/images/icons/btc-ic.svg";
import {  communityAtom } from '../../_state/';
import {communityActions} from "../../_actions/";
import dayjs from "dayjs";
import ReactHtmlParser from 'react-html-parser';

const Community = () => {
    const communityAction = communityActions();
    const communityList = useRecoilValue(communityAtom);

    console.log(communityList,'dddd');
    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Community
        </Typography>,
    ];
    useEffect(() => {
     communityAction.community()
         window.scrollTo({ top: 1, left: 1, behavior: "smooth" })

         },[]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='community-wrapper subscription-wrapper bredcrum-div'>
                    <Container maxWidth="lg">

                    <Box className='right-breadcrum ol community-class' sx={{ color: '#777E90', fontWeight: '500', }}>
                                <Box  >
                                    <Breadcrumbs
                                        separator={<NavigateNext fontSize="small" />}
                                        aria-label="breadcrumb"
                                        className='center-breadcrum'
                                    >
                                        {breadcrumbs}
                                    </Breadcrumbs>

                                </Box>
                            </Box>

                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Top Crypto Experts Reviews for May 2023
                            </Typography>

                            
                        </Box>
                        <Box className="community-wrapper-inner">

                            { communityList?.map((item) => {
                                return (
                                    <Box className="community-card">
                                        <Box className="community-card-head">
                                            {item.image == null || item.image == ''? " " : 
                                            <Box className="community-ic community-ic-img">
                                                <img src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} alt='' /> 
                                            </Box>}
                                            <Box className="community-details">
                                                <Box className="community-details-head">
                                                    <Typography component='small' variant='body2' className='small-caption community-category'> {item.title} </Typography>
                                                    <Typography component='small' variant='body2' className='small-caption'>  {dayjs(item.created_at).format("MMM/DD/YYYY" )} </Typography>
                                                </Box>
                                                <Typography component='h5' variant='h5'> {item.exp_review} </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Typography className="elip_typo" component='p' variant='p'>
                                            
                                            {ReactHtmlParser (item.decription) }
                                        </Typography>
                                    </Box>  
                                )
                            }) }
                                   
                        </Box>
                        <Typography component='p' variant='p' className='small-caption' sx={{ mt: 3 }}> * Coin Guru accepts no liability for content of the comments or reviews made by the site users. The entire responsibility for the contents rests with the authors.</Typography>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Community
