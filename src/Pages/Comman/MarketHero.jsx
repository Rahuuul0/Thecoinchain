import React from 'react'
import { useEffect } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import MarketHeroImg from '../../../public/assets/images/market-hero.svg'
import MarketHeroMobileImg from '../../../public/assets/images/market-hero-mobile.svg'
import { bannerListActions } from '../../_actions';
import { MarketBannerAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import ReactHtmlParser from 'react-html-parser';

const MarketHero = () => {
    const bannerActions = bannerListActions();
    const MarketBannerData = useRecoilValue(MarketBannerAtom);

    useEffect(() => {
        const response = bannerActions.marketBannerList();
        response.then((res) => {(res) })
    }, []);

    return (
        <>
            <Box className='market-hero'>
            {MarketBannerData ?.map((items) => {
                 let title = items.title;
                 let description = items.decription;
                 let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}`:items.image_link
                   return (
                <Container maxWidth="lg">
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={12} sm={8} md={8} lg={6}>
                            <Typography component="h1" variant='h1' fontFamily='var(--secondary-font) !important' position='relative' zIndex='2'>
                              {title}
                            </Typography>
                            <Typography component="p" variant='body1' className='body-large' position='relative' zIndex='2' sx={{ color: '#353945' }}>
                            {ReactHtmlParser(description)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box className='market-hero-img-wrapper'>
                                <img src={image}  alt='Market' className='for-desktop' />
                                <img src={MarketHeroMobileImg} alt='Market' className='for-mobile' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                  )
                })}
            </Box>
        </>
    )
}

export default MarketHero
