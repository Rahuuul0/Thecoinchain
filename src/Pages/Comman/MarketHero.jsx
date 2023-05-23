import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import MarketHeroImg from '../../../public/assets/images/market-hero.svg'

const MarketHero = () => {
    return (
        <>
            <Box className='market-hero'>
                <Container maxWidth="lg">
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item  xs={12} sm={6} md={6}>
                            <Typography component="h1" variant='h1' fontFamily='var(--secondary-font) !important' position='relative' zIndex='2'>
                                Invest smarter, not harder
                            </Typography>
                            <Typography component="p" variant='body1' className='body-large' position='relative' zIndex='2' sx={{ color: '#353945' }}>
                                with our machine learning crypto predictions!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box className='market-hero-img-wrapper'>
                                <img src={MarketHeroImg} alt='' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default MarketHero
