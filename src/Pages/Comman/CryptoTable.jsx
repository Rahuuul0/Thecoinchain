import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BTC from '../../../public/assets/images/icons/btc-ic.svg'
import VolumeIc from '../../../public/assets/images/icons/volume-ic.svg'
import MarketcapIc from '../../../public/assets/images/icons/dollar.svg'
import ChartUp from '../../../public/assets/images/chart-up.svg'
import ChartDown from '../../../public/assets/images/chart-down.svg'

const CryptoTable = () => {
    return (
        <>
            <Box component="div" className='crypto-list' sx={{ py: 2 }}>
                <Container maxWidth="lg">
                    <Box component="div" className='crypto-list-table'>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow hover >
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='right'>Price</TableCell>
                                        <TableCell align='right'>24h %</TableCell>
                                        <TableCell align='right'>7d %</TableCell>
                                        <TableCell align='right'>
                                            <span style={{ display: 'inline-flex', gap: '8px' }}>
                                                Marketcap <img src={MarketcapIc} alt='' />
                                            </span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span style={{ display: 'inline-flex', gap: '8px' }}>
                                                Volume (24h) <img src={VolumeIc} alt='' />
                                            </span>
                                        </TableCell>
                                        <TableCell align='right'>Chart</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>1</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>2</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>3</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>4</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>5</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>6</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>7</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>

                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className='down'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartDown} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>8</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>9</TableCell>
                                        <TableCell>
                                            <div className="crypto-name">
                                                <img src={BTC} alt='BTC' width="33px" />
                                                Bitcoin <span className="currency_name">BTC</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>$12,345</TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <span className='up'>+1.41%</span>
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            $100,000,000,000
                                        </TableCell>
                                        <TableCell align='right'>
                                            <img src={ChartUp} alt='chart' height="33px" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container >
            </Box >
        </>
    )
}

export default CryptoTable
