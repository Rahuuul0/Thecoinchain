import React from 'react'
import { Box, Container, Link, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import CurrencyImg from '../../public/assets/images/icons/btc.svg'
import NewsImg from '../../public/assets/images/coinbase.png'
import CalendarIc from '../../public/assets/images/icons/calendar-ic.svg'

const News = () => {

    const [coins, setCoins] = React.useState('');

    const handleChange = (event) => {
        setCoins(event.target.value);
    };
    return (
        <Box component="main" className='news-page' sx={{ py: 8 }}>
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
                <Container maxWidth="lg">
                    <Box component="div" className='news-itm'>
                        <Box component="div" className='news-img'>
                            <img src={NewsImg} alt='' />
                        </Box>
                        <Box component="div" className='news-content'>
                            <Typography component="h5" variant='h5'>
                                Has This Ex-Coinbase Exec Just Made the Worst Bet in Crypto History?
                            </Typography>
                            <Typography component="p" variant='body1'>
                                The bet comes as a result of Balaji Srinivasan's belief in "hyperbitcoinization" — as he thinks major fiat currencies are on the brink of being "i...
                            </Typography>
                            <Box component="div" className='news-auther'>
                                <Typography component="p" variant='body1'>
                                    Leo Jakobson
                                </Typography>
                                <Box component="div" className='current-badge'>
                                    <img src={CurrencyImg} alt='currency img' />
                                    <Typography component="small" variant='body2'>
                                        EUL
                                    </Typography>
                                </Box>
                                <Box component="div" className='news-date'>
                                    <span>
                                        <img src={CalendarIc} alt='Calendar icon' />
                                    </span> 13 March 2023
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className='news-itm'>
                        <Box component="div" className='news-img'>
                            <img src={NewsImg} alt='' />
                        </Box>
                        <Box component="div" className='news-content'>
                            <Typography component="h5" variant='h5'>
                                Has This Ex-Coinbase Exec Just Made the Worst Bet in Crypto History?
                            </Typography>
                            <Typography component="p" variant='body1'>
                                The bet comes as a result of Balaji Srinivasan's belief in "hyperbitcoinization" — as he thinks major fiat currencies are on the brink of being "i...
                            </Typography>
                            <Box component="div" className='news-auther'>
                                <Typography component="p" variant='body1'>
                                    Leo Jakobson
                                </Typography>
                                <Box component="div" className='current-badge'>
                                    <img src={CurrencyImg} alt='currency img' />
                                    <Typography component="small" variant='body2'>
                                        EUL
                                    </Typography>
                                </Box>
                                <Box component="div" className='news-date'>
                                    <span>
                                        <img src={CalendarIc} alt='Calendar icon' />
                                    </span> 13 March 2023
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className='news-itm'>
                        <Box component="div" className='news-img'>
                            <img src={NewsImg} alt='' />
                        </Box>
                        <Box component="div" className='news-content'>
                            <Typography component="h5" variant='h5'>
                                Has This Ex-Coinbase Exec Just Made the Worst Bet in Crypto History?
                            </Typography>
                            <Typography component="p" variant='body1'>
                                The bet comes as a result of Balaji Srinivasan's belief in "hyperbitcoinization" — as he thinks major fiat currencies are on the brink of being "i...
                            </Typography>
                            <Box component="div" className='news-auther'>
                                <Typography component="p" variant='body1'>
                                    Leo Jakobson
                                </Typography>
                                <Box component="div" className='current-badge'>
                                    <img src={CurrencyImg} alt='currency img' />
                                    <Typography component="small" variant='body2'>
                                        EUL
                                    </Typography>
                                </Box>
                                <Box component="div" className='news-date'>
                                    <span>
                                        <img src={CalendarIc} alt='Calendar icon' />
                                    </span> 13 March 2023
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className='news-itm'>
                        <Box component="div" className='news-img'>
                            <img src={NewsImg} alt='' />
                        </Box>
                        <Box component="div" className='news-content'>
                            <Typography component="h5" variant='h5'>
                                Has This Ex-Coinbase Exec Just Made the Worst Bet in Crypto History?
                            </Typography>
                            <Typography component="p" variant='body1'>
                                The bet comes as a result of Balaji Srinivasan's belief in "hyperbitcoinization" — as he thinks major fiat currencies are on the brink of being "i...
                            </Typography>
                            <Box component="div" className='news-auther'>
                                <Typography component="p" variant='body1'>
                                    Leo Jakobson
                                </Typography>
                                <Box component="div" className='current-badge'>
                                    <img src={CurrencyImg} alt='currency img' />
                                    <Typography component="small" variant='body2'>
                                        EUL
                                    </Typography>
                                </Box>
                                <Box component="div" className='news-date'>
                                    <span>
                                        <img src={CalendarIc} alt='Calendar icon' />
                                    </span> 13 March 2023
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className='news-itm'>
                        <Box component="div" className='news-img'>
                            <img src={NewsImg} alt='' />
                        </Box>
                        <Box component="div" className='news-content'>
                            <Typography component="h5" variant='h5'>
                                Has This Ex-Coinbase Exec Just Made the Worst Bet in Crypto History?
                            </Typography>
                            <Typography component="p" variant='body1'>
                                The bet comes as a result of Balaji Srinivasan's belief in "hyperbitcoinization" — as he thinks major fiat currencies are on the brink of being "i...
                            </Typography>
                            <Box component="div" className='news-auther'>
                                <Typography component="p" variant='body1'>
                                    Leo Jakobson
                                </Typography>
                                <Box component="div" className='current-badge'>
                                    <img src={CurrencyImg} alt='currency img' />
                                    <Typography component="small" variant='body2'>
                                        EUL
                                    </Typography>
                                </Box>
                                <Box component="div" className='news-date'>
                                    <span>
                                        <img src={CalendarIc} alt='Calendar icon' />
                                    </span> 13 March 2023
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="div" className='load-more'>
                        <Link href='#'>load more ...</Link>
                    </Box>

                </Container>
            </Box>
        </Box>
    )
}

export default News
