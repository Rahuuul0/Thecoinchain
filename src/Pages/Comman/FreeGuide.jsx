import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import FreeGuide01 from '../../../public/assets/images/icons/bitcoin-big.svg';
import FreeGuide02 from '../../../public/assets/images/icons/nft-big.svg';
import FreeGuide03 from '../../../public/assets/images/icons/xrp-big.svg';

const FreeGuide = () => {
    return (
        <>
            <Box component="div" className='free-guide' sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    <Box component="div" className='free-guide-head'>
                        <Typography component="h3" variant="h3">
                            Free Guides
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Find out everything about cryptocurrency
                        </Typography>
                    </Box>
                    <Box component="div" className='free-guide-cards'>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                            <Grid item sm={4}>
                                <Paper className='free-guide-card'>
                                    <img
                                        src={FreeGuide01}
                                        alt="Free Guide"
                                    />
                                    <Typography component="h5" variant="h5">
                                        NFT pricing strategy: How to price your NFTs?
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        The Biggest Misconceptions About Cryptocurrency Markets
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item sm={4}>
                                <Paper className='free-guide-card'>
                                    <img
                                        src={FreeGuide02}
                                        alt="Free Guide"
                                    />
                                    <Typography component="h5" variant="h5">
                                        NFT pricing strategy: How to price your NFTs?
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        NFTs can be fixed-priced or sold during an auction. However, creators should consistently sell to demonstrate a pro.....
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item sm={4}>
                                <Paper className='free-guide-card'>
                                    <img
                                        src={FreeGuide03}
                                        alt="Free Guide"
                                    />
                                    <Typography component="h5" variant="h5">
                                        Start Earning
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        The 2025 - 2030 TRON (TRX) Price Prediction: The Long Way to All-Time High and Above
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default FreeGuide
