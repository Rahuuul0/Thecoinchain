import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BTC from '../../../public/assets/images/icons/btc.svg'

const CryptoList = () => {
    return (
        <>
            <Box component="div" className='crypto-list' sx={{ py: 2 }}>
                <Container maxWidth="lg">
                    <Box component="div" className='crypto-list-table'>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Crypto</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>VIX</TableCell>
                                        <TableCell>24h%</TableCell>
                                        <TableCell>7d%</TableCell>
                                        <TableCell>Market Cap</TableCell>
                                        <TableCell>Volumn 24h</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>1</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>2</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>3</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>4</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>5</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>6</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>7</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>8</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>9</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>$12,345</TableCell>
                                        <TableCell>
                                            <span className='badge badge-red'>88</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell>
                                            $100,000,000,000
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box component="div" className='crypto-list-note'>
                        <Typography component="p" variant='body2' sx={{ color: '#6C757D' }}>
                            * Coinguru accepts no liability for any errors in the information, Cryptocurrency Prices, Market Cap and reviews. For the most up-to-date prices please visit the Cryptocurrency's official website. Coinguru rates Cryptocurrencies by the Crypto Volatility Index, Market Capitalization and Price. At Coinguru we invite Cryptocurrency trading professionals to join the Crypto Community and help investors make balanced and informed decisions based on their experience and level of expertise.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default CryptoList
