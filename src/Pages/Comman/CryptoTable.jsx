import React from 'react';
import { Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import BTC from '../../../public/assets/images/icons/btc-ic.svg'
import VolumeIc from '../../../public/assets/images/icons/volume-ic.svg'
import MarketcapIc from '../../../public/assets/images/icons/dollar.svg'
import ChartUp from '../../../public/assets/images/chart-up.svg'
import ChartDown from '../../../public/assets/images/chart-down.svg'
import DollarImg from '../../../public/assets/images/icons/dollar.svg'
import TimeImg from '../../../public/assets/images/icons/time-ic.svg'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CryptoTable = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Box className='crypto-list' sx={{ py: 2 }}>
                <Box className='crypto-list-table'>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
                                    <TableCell onClick={handleOpen}>
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
            </Box >

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-dialog modal-crypto-table">
                    <Button onClick={handleClose} variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><CloseIcon /></Button>
                    <Box className="modal-head">
                        <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
                            <NavigateBeforeIcon /> BTC
                        </Typography>
                    </Box>
                    <Box id="modal-modal-description" className="modal-modal-description" sx={{ mt: 2, p: 2 }}>
                        <Typography className="crypto-fullname" variant="h5" component="h5">
                            BTC/USDT <span className='badge'>1x</span>
                        </Typography>
                        <Typography className="crypto-fullname-small" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600' }}>
                            Bitcoin
                        </Typography>
                        <Box className="value-details">
                            <Button variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><KeyboardArrowDownIcon /></Button>
                            <Typography className="crypto-value" variant="h5" component="h5">
                                36,641.20
                            </Typography>
                            <Typography className="crypto-fullname-small" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600', display: 'flex' }}>
                                <img src={DollarImg} alt='chart' height="16px" /> 36,641.20
                            </Typography>
                            <Typography className="crypto-prection" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600' }}>
                                Prediction price for end of current time frame.
                            </Typography>

                            <TabContext value={value}>
                                <Box>
                                    <TabList onChange={handleChange} aria-label="Login Tabs">
                                        <Tab label="15m" value="1" />
                                        <Tab label="1h" value="2" />
                                        <Tab label="4h" value="3" />
                                        <Tab label="1d" value="4" />
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
                            <Box className="value-with-date">
                                <Box className="value-with-date-col">
                                    <Typography variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src={TimeImg} alt='chart' height="16px" /> <span>15/10/23</span> 07:45
                                    </Typography>
                                    <Typography variant="body2" component="small" sx={{ color: '#00C076', fontWeight: '500' }}>
                                        520.80 <span>+1.25%</span>
                                    </Typography>
                                </Box>
                                <Box className="value-with-date-col">
                                    <Typography variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src={TimeImg} alt='chart' height="16px" /> <span>15/10/23</span> 07:45
                                    </Typography>
                                    <Typography variant="body2" component="small" sx={{ color: '#141416', fontWeight: '500' }}>
                                        37162.00 <span>+1.25%</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        className='btn btn-primary'
                    >
                        Back
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default CryptoTable
