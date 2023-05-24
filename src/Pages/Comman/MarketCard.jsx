import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GraphUp from '../../../public/assets/images/chart-up.svg'
import GraphDown from '../../../public/assets/images/chart-down.svg'
import BtcIc from '../../../public/assets/images/icons/btc-ic.svg'
import AtcIc from '../../../public/assets/images/icons/atc-ic.svg'
import EthIc from '../../../public/assets/images/icons/eth-ic.svg'

const MarketCard = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Box className='market-crypto-card-wrapper'>
                <Container maxWidth="lg">
                    <Box className='market-crypto-card-wrapper-inner'>
                        <Box className='market-crypto-graph'>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={BtcIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>BTC/USDT <span className='status-badge'>+0.79%</span></Typography>
                                        <Typography component="h5" varient="h5">36,641.20</Typography>
                                        <Typography component="small" varient="small-caption">36,641.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphUp} alt='' />
                                </Box>
                            </Box>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={AtcIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>ATC/USDT <span className='status-badge status-down'>-0.79%</span></Typography>
                                        <Typography component="h5" varient="h5">41.20</Typography>
                                        <Typography component="small" varient="small-caption">41.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphDown} alt='' />
                                </Box>
                            </Box>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={EthIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>ETH/USDT <span className='status-badge'>+0.54%</span></Typography>
                                        <Typography component="h5" varient="h5">3,641.20</Typography>
                                        <Typography component="small" varient="small-caption">3,641.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphUp} alt='' />
                                </Box>
                            </Box>
                        </Box>
                        <Box className='market-crypto-tabs'>
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
                </Container>
            </Box>
        </>
    )
}

export default MarketCard
