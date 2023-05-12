import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import heroImg from '../../../../../public/assets/images/hero-image.png';
import heroImg2x from '../../../../../public/assets/images/hero-image.png';
import heroImg3x from '../../../../../public/assets/images/hero-image.png';
import AnimkidIc from '../../../../../public/assets/images/icons/animkid.svg';

const HeroSection = () => {
    return (
        <>
            <Box component="div" className='hero-section' sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item sm={6}>
                            <Typography component="h1" variant="h1">
                                Masterclass of Crypto trading in 2023
                            </Typography>
                            <Typography component="h5" variant="h5">
                                NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.
                            </Typography>

                            <Button variant="contained" className='btn btn-primary' startIcon={<RocketLaunchOutlinedIcon />}>
                                Get Started
                            </Button>
                            <Box component="div" className='hero-feature'>
                                <Grid item container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item sm={4}>
                                        <Typography component="h4" variant="h4">
                                            240k+
                                        </Typography>
                                        <Typography component="h5" variant="h5" >
                                            Total Sale
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography component="h4" variant="h4">
                                            100k+
                                        </Typography>
                                        <Typography component="h5" variant="h5" >
                                            Auctions
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography component="h4" variant="h4">
                                            240k+
                                        </Typography>
                                        <Typography component="h5" variant="h5" >
                                            Artists
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item sm={6}>
                            <Box component="div" className='hero-card-wrapper'>
                                <Box component="div" className='hero-card-img'>
                                    <img
                                        src={heroImg}
                                        srcSet={`${heroImg} 1x, ${heroImg2x} 2x, ${heroImg3x} 3x`}
                                        alt="Hero image"
                                        loading="lazy"
                                    />
                                </Box>
                                <Box component="div" className='hero-card-content'>
                                    <Typography component="h5" variant="h5">
                                        Space Walking
                                    </Typography>
                                    <Box component="div" className='hero-card-animkid'>
                                        <img
                                            src={AnimkidIc}
                                            alt="Animkid"
                                            loading="lazy"
                                        />
                                        <Typography component="p" variant="body1">
                                            Aminkid
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default HeroSection
