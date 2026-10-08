import React from 'react'
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs, Backdrop, CircularProgress } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import BTCIc from "../../../public/assets/images/icons/btc-ic.svg";
import { communityAtom, loaderAtom } from '../../_state/';
import { communityActions } from "../../_actions/";
import dayjs from "dayjs";
import ReactHtmlParser from 'react-html-parser';
import CryptoTickerMarquee from './Components/CryptoTickerMarquee';

const Community = () => {
    const communityAction = communityActions();
    const communityList = useRecoilValue(communityAtom);
    const loader = useRecoilValue(loaderAtom);

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
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    }, []);

    return (
        <>
            <Box
                sx={{
                    mt: { xs: '56px', sm: '64px' },
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <CryptoTickerMarquee />
            </Box>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                Top Crypto Experts Reviews for {dayjs().year()}
                            </Typography>
                        </Box>
                        <Box className="community-wrapper-inner">

                            {communityList?.map((item) => {
                                let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                                return (
                                    <Box className="community-card">
                                        <Box className="community-card-head">
                                            {image == null || image == '' ? " " :
                                                <Box className="community-ic community-ic-img">
                                                    <img src={image} alt='' />
                                                </Box>}
                                            <Box className="community-details">
                                                <Box className="community-details-head">
                                                    <Typography component='small' variant='body2' className='small-caption community-category'> {item.title} </Typography>
                                                    <Typography component='small' variant='body2' className='small-caption'>  {dayjs(item.created_at).format("MMM/DD/YYYY")} </Typography>
                                                </Box>
                                                <Typography component='h5' variant='h5'> {item.exp_review} </Typography>
                                            </Box>
                                        </Box>

                                        <Typography className="elip_typo" component='p' variant='p'>

                                            {ReactHtmlParser(item.decription)}
                                        </Typography>
                                    </Box>
                                )
                            })}

                        </Box>
                        <Typography component='p' variant='p' className='small-caption' sx={{ mt: 3 }}> * TheCoinChain accepts no liability for content of the comments or reviews made by the site users. The entire responsibility for the contents rests with the authors.</Typography>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Community
