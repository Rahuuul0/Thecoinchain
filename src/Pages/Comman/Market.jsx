import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MarketHero from '../../../public/assets/images/market-hero.svg'
import GraphUp from '../../../public/assets/images/chart-up.svg'
import GraphDown from '../../../public/assets/images/chart-down.svg'
import BtcIc from '../../../public/assets/images/icons/btc-ic.svg'
import AtcIc from '../../../public/assets/images/icons/atc-ic.svg'
import EthIc from '../../../public/assets/images/icons/eth-ic.svg'
import { Link } from 'react-router-dom';
import LearnNEarn from './LearnNEarn';
import CryptoTable from './CryptoTable';

const Market = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='market-wrapper' sx={{ mt: 8 }}>
                    <Box component="div" className='market-hero'
                    // sx={{ backgroundImage: "url('/market-hero.svg')" }}
                    >
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
                                        <img src={MarketHero} alt='' />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <Box component="div" className='market-inner'>
                        <Container maxWidth="lg">
                            <Box component="div" className='market-crypto-card-wrapper'>
                                <Box component="div" className='market-crypto-graph'>
                                    <Box component="div" className='market-crypto-graph-col'>
                                        <Box component="div" className='market-crypto-graph-ic'>
                                            <img src={BtcIc} alt='' />
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <Box component="div" className='market-crypto-name'>
                                                <Typography component="small" varient="body2" className='currency-name'>BTC/USDT <span className='status-badge'>+0.79%</span></Typography>
                                                <Typography component="h5" varient="h5">36,641.20</Typography>
                                                <Typography component="small" varient="small-caption">36,641.20</Typography>
                                            </Box>
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <img src={GraphUp} alt='' />
                                        </Box>
                                    </Box>
                                    <Box component="div" className='market-crypto-graph-col'>
                                        <Box component="div" className='market-crypto-graph-ic'>
                                            <img src={AtcIc} alt='' />
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <Box component="div" className='market-crypto-name'>
                                                <Typography component="small" varient="body2" className='currency-name'>ATC/USDT <span className='status-badge status-down'>-0.79%</span></Typography>
                                                <Typography component="h5" varient="h5">41.20</Typography>
                                                <Typography component="small" varient="small-caption">41.20</Typography>
                                            </Box>
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <img src={GraphDown} alt='' />
                                        </Box>
                                    </Box>
                                    <Box component="div" className='market-crypto-graph-col'>
                                        <Box component="div" className='market-crypto-graph-ic'>
                                            <img src={EthIc} alt='' />
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <Box component="div" className='market-crypto-name'>
                                                <Typography component="small" varient="body2" className='currency-name'>ETH/USDT <span className='status-badge'>+0.54%</span></Typography>
                                                <Typography component="h5" varient="h5">3,641.20</Typography>
                                                <Typography component="small" varient="small-caption">3,641.20</Typography>
                                            </Box>
                                        </Box>
                                        <Box component="div" className='market-crypto-graph-details'>
                                            <img src={GraphUp} alt='' />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box component="div" className='market-crypto-tabs'>
                                    <TabContext value={value}>
                                        <Box>
                                            <TabList onChange={handleChange} aria-label="Login Tabs">
                                                <Tab label="Cryptocurrencies" value="1" />
                                                <Tab label="DeFi" value="2" />
                                                <Tab label="Innovation" value="3" />
                                                <Tab label="POS" value="4" />
                                                <Tab label="NFT" value="5" />
                                                <Tab label="POW" value="6" />
                                            </TabList>
                                        </Box>
                                        {/* <TabPanel value="1" sx={{ p: 0 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className='btn btn-primary'
                                            disabled={isSubmitting}>
                                            Login
                                            </Button>
                                            </TabPanel>
                                    <TabPanel value="2" sx={{ p: 0 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className='btn btn-primary'
                                            disabled={isSubmitting}>
                                            Login
                                            </Button>
                                        </TabPanel> */}
                                    </TabContext>
                                    <Button
                                        variant="outlined"
                                        className='btn btn-outlined-secondary'>
                                        Predict
                                    </Button>
                                </Box>
                            </Box>

                            <CryptoTable />

                            <Box component="div" className='price-prediction'>
                                <Typography component="h2" variant='h2'>
                                    Cryptocurrency Price Predictions
                                </Typography>
                                <Typography component="p" variant='body1' className='body-large' sx={{ color: '#3B3B3B' }}>
                                    Please <Link href="#" style={{ color: '#FFD166' }}>Subscribe</Link> now to gain complete access to the most precise short and long-term predictions of cryptocurrency prices.
                                </Typography>
                            </Box>

                            <LearnNEarn />

                        </Container>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default Market
