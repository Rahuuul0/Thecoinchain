import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import MarketHeroImg from '../../../public/assets/images/market-hero.svg'

const MarketHero = () => {
    return (
        <>
            <Box component="div" className='market-hero'>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item md={6}>
                            <Typography component="h1" variant='h1'>
                                Invest smarter, not harder
                            </Typography>
                            <Typography component="p" variant='body1' className='body-large'>
                                with our machine learning crypto predictions!
                            </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Box component="div" className='market-hero-img-wrapper'>
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
