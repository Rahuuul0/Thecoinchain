import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { Box, Container, Grid, Typography, Button, Modal, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LoadMoreIc from '../../../public/assets/images/icons/cale-ic.svg'
import DepositImg from '../../../public/assets/images/deposit.svg'
import TransferImg from '../../../public/assets/images/transfer.svg'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';


const Notifications = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='notification-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='notification-inner'>
                            <Box className='notification-list-card'>
                                <Box className='notification-wrapper-head'>
                                    <Typography component="h4" variant='h4'>
                                        Notifications
                                    </Typography>

                                    <Box className='notification-head-cta'>
                                        <Box className="modal-subscribed-cta">
                                            <Button variant="outlined" className='btn btn-outlined-secondary' >Mark all as read</Button>
                                            <Button variant="outlined" className='btn btn-outlined-secondary' >Clear all</Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="devider" />
                                <Box className='notification-list-wrapper'>
                                    <Box className='notification-list'>
                                        <Box className='notification-list-itm'>
                                            <Box className='notification-icon'>
                                                <BoltOutlinedIcon />
                                            </Box>
                                            <Box className='notification-title'>
                                                <Typography component="p" variant='body'>
                                                    BTC Price Alert
                                                </Typography>
                                                <Typography component="small" variant='body2'>
                                                    ASDF
                                                </Typography>
                                            </Box>
                                            <Box className='notification-date'>
                                                <Typography component="small" variant='body2'>
                                                    <span className='n-date'>2021-03-10</span> <span className='n-time'>20:19:15</span>
                                                </Typography>
                                                <span className='notification-circle'></span>
                                            </Box>
                                        </Box>
                                        <Box className='notification-list-itm'>
                                            <Box className='notification-icon'>
                                                <BoltOutlinedIcon />
                                            </Box>
                                            <Box className='notification-title'>
                                                <Typography component="p" variant='body'>
                                                    BTC Price Alert
                                                </Typography>
                                                <Typography component="small" variant='body2'>
                                                    ASDF
                                                </Typography>
                                            </Box>
                                            <Box className='notification-date'>
                                                <Typography component="small" variant='body2'>
                                                    <span className='n-date'>2021-03-10</span> <span className='n-time'>20:19:15</span>
                                                </Typography>
                                                <span className='notification-circle'></span>
                                            </Box>
                                        </Box>
                                        <Box className='notification-list-itm'>
                                            <Box className='notification-icon'>
                                                <BoltOutlinedIcon />
                                            </Box>
                                            <Box className='notification-title'>
                                                <Typography component="p" variant='body'>
                                                    BTC Price Alert
                                                </Typography>
                                                <Typography component="small" variant='body2'>
                                                    ASDF
                                                </Typography>
                                            </Box>
                                            <Box className='notification-date'>
                                                <Typography component="small" variant='body2'>
                                                    <span className='n-date'>2021-03-10</span> <span className='n-time'>20:19:15</span>
                                                </Typography>
                                                <span className='notification-circle'></span>
                                            </Box>
                                        </Box>
                                        <Box className='notification-list-itm'>
                                            <Box className='notification-icon'>
                                                <BoltOutlinedIcon />
                                            </Box>
                                            <Box className='notification-title'>
                                                <Typography component="p" variant='body'>
                                                    BTC Price Alert
                                                </Typography>
                                                <Typography component="small" variant='body2'>
                                                    ASDF
                                                </Typography>
                                            </Box>
                                            <Box className='notification-date'>
                                                <Typography component="small" variant='body2'>
                                                    <span className='n-date'>2021-03-10</span> <span className='n-time'>20:19:15</span>
                                                </Typography>
                                                <span className='notification-circle'></span>
                                            </Box>
                                        </Box>
                                        <Box className='notification-list-itm'>
                                            <Box className='notification-icon'>
                                                <BoltOutlinedIcon />
                                            </Box>
                                            <Box className='notification-title'>
                                                <Typography component="p" variant='body'>
                                                    BTC Price Alert
                                                </Typography>
                                                <Typography component="small" variant='body2'>
                                                    ASDF
                                                </Typography>
                                            </Box>
                                            <Box className='notification-date'>
                                                <Typography component="small" variant='body2'>
                                                    <span className='n-date'>2021-03-10</span> <span className='n-time'>20:19:15</span>
                                                </Typography>
                                                <span className='notification-circle'></span>
                                            </Box>
                                        </Box>

                                        <Button variant="outlined" className='btn btn-outlined-secondary' sx={{ mx: 'auto' }}>Load more <img src={LoadMoreIc} alt='' /> </Button>
                                    </Box>
                                    <Box className='notification-filter'>
                                        <Typography component="h5" variant='h5'>
                                            Filters
                                        </Typography>

                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Crypto Prediction" />
                                            <FormControlLabel control={<Checkbox />} label="Community" />
                                            <FormControlLabel control={<Checkbox />} label="Academy" />
                                            <FormControlLabel control={<Checkbox />} label="News" />
                                        </FormGroup>

                                        <Box className='notification-filter-cta'>
                                            <Button size='small' variant="outlined" className='btn btn-outlined-secondary'>Select all</Button>
                                            <Button size='small' variant="outlined" className='btn btn-outlined-secondary'>Unselect all</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className='deposit-transfer'>
                                <Box className="deposit-transfer-card">
                                    <Box className="deposit-transfer-img">
                                        <img src={DepositImg} alt='Deposit' />
                                    </Box>
                                    <Box className="deposit-transfer-details">
                                        <Typography component="h5" variant='h5'>
                                            Bank deposit
                                        </Typography>
                                        <Typography component="p" variant='body1' className='body-caption'>
                                            Deposit crypto or cash currency to your wallet and start trading on the world largest exchange!
                                        </Typography>
                                        <Button size='small' variant="outlined" className='btn btn-outlined-secondary' endIcon={<ArrowRightAltOutlinedIcon />}>Bank deposit</Button>
                                    </Box>
                                </Box>
                                <Box className="deposit-transfer-card">
                                    <Box className="deposit-transfer-img">
                                        <img src={TransferImg} alt='Transfer' />
                                    </Box>
                                    <Box className="deposit-transfer-details">
                                        <Typography component="h5" variant='h5'>
                                            Transfer
                                        </Typography>
                                        <Typography component="p" variant='body1' className='body-caption'>
                                            Internal transfers are free on Bitcloud.
                                        </Typography>
                                        <Button size='small' variant="outlined" className='btn btn-outlined-secondary' endIcon={<ArrowRightAltOutlinedIcon />}>Transfer coin</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Notifications
