import React from 'react'
import { Box, Container, Link, Typography, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import PriceTicker from './Comman/PriceTicker'
import CurrencyImg from '../../public/assets/images/icons/btc.svg'
import NewsImg from '../../public/assets/images/coinbase.png'
import TimeIc from '../../public/assets/images/icons/time-ic.svg'

const Courses = () => {

    const [coins, setCoins] = React.useState('');

    const handleChange = (event) => {
        setCoins(event.target.value);
    };

    return (
        <>
            <Box component="main" className='course-page' sx={{ py: 8 }}>
                <Box component="div" className='subscribe-newsletter'>
                    <Container maxWidth="lg">
                        <Typography component="p" variant='body1'>
                            Join the thousands already learning crypto!
                        </Typography>
                        <Button variant="contained" className="btn btn-primary">Subscribe</Button>
                    </Container>
                </Box>
                <Box component="div" className='course-head'>
                    <Container maxWidth="lg">
                        <Box component="div" className='course-head-inner'>
                            <Typography component="h5" variant='h5'>
                                Course <span>(84)</span>
                            </Typography>
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
                                    <Box component="div" className='course-badge hard'>
                                        <Typography component="small" variant='body2'>
                                            Hard
                                        </Typography>
                                    </Box>
                                    <Box component="div" className='news-date'>
                                        <span>
                                            <img src={TimeIc} alt='Calendar icon' />
                                        </span> 1m
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
                                    <Box component="div" className='course-badge moderate'>
                                        <Typography component="small" variant='body2'>
                                            Moderate
                                        </Typography>
                                    </Box>
                                    <Box component="div" className='news-date'>
                                        <span>
                                            <img src={TimeIc} alt='Calendar icon' />
                                        </span> 3m
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
                                    <Box component="div" className='course-badge easy'>
                                        <Typography component="small" variant='body2'>
                                            Easy
                                        </Typography>
                                    </Box>
                                    <Box component="div" className='news-date'>
                                        <span>
                                            <img src={TimeIc} alt='Calendar icon' />
                                        </span> 2m
                                    </Box>
                                </Box>
                            </Box>
                        </Box>


                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default Courses
