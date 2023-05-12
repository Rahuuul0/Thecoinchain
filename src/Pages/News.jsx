import React from 'react'
import { Box, Container, Link, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PriceTicker from './Comman/PriceTicker'

const News = () => {

    const [coins, setCoins] = React.useState('');

    const handleChange = (event) => {
        setCoins(event.target.value);
    };
    return (
        <Box component="main" sx={{ py: 8 }}>
            <PriceTicker />
            <Box component="div" className='news-head'>
                <Container maxWidth="lg">
                    <Box component="div" className='news-head-inner'>
                        <Box component="div" className='news-head-title'>
                            <Typography component="h5" variant='h5'>
                                News
                            </Typography>
                            <Typography component="p" variant='body1'>
                                Insights into the biggest events shaping the crypto industry.
                            </Typography>
                        </Box>
                        <Box component="div" className='news-head-filter'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="coins-filter">All Coins</InputLabel> */}
                                    <Select
                                        // labelId="coins-filter"
                                        id="coins-filter-select"
                                        value={coins}
                                        placeholder="Coins"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>All Coins</MenuItem>
                                        <MenuItem value={20}>BTC</MenuItem>
                                        <MenuItem value={30}>ETH</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box component="div" className='news-inner'>

            </Box>
        </Box>
    )
}

export default News
