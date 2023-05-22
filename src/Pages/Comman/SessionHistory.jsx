import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link, Breadcrumbs, Stack, Select, OutlinedInput, MenuItem, Switch, Row } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import FA from '../../../public/assets/images/fa.svg';
import Lockbtn from '../../../public/assets/images/lockbtn.svg';
import { KeyboardArrowRightIcon, NavigateNext } from '@mui/icons-material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import USAflag from '../../../public/assets/images/icons/usa.svg';

const SessionHistory = () => {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Sessions & login history
        </Typography>,
    ];

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Sessions & login history
                            </Typography>
                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                                <Box  >
                                    <Breadcrumbs
                                        separator={<NavigateNext fontSize="small" />}
                                        aria-label="breadcrumb"
                                        className='center-breadcrum'
                                    >
                                        {breadcrumbs}
                                    </Breadcrumbs>
                                </Box>
                            </Box>
                        </Box>
                    </Container>

                    <Box className='subscription-steps'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner'>
                                <Box className='subscription-steps-col'>
                                    <Stack spacing={2}>
                                        <Typography className='left-icon secondary-color'><span><img src={User} /> </span>Profile</Typography>
                                        <Typography className='left-icon secondary-color'><span><img src={Share} /> </span>Referrals</Typography>
                                        <Typography className='left-icon secondary-color'><span><img src={Api} /> </span>API keys</Typography>
                                        <Typography className='left-icon secondary-color'><span><img src={Session} /> </span>Sessions & login history</Typography>
                                        <Typography className='left-icon secondary-color'><span><img src={FA} /> </span>2FA</Typography>
                                        <Typography className='left-icon secondary-color'><span><img src={Lockbtn} /> </span>Change password</Typography>
                                    </Stack>
                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box className='active-session'>
                                        <Typography component="h5" variant='h5'>
                                            Active sessions
                                        </Typography>
                                        <Box className='session-list'>
                                            <TableContainer>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    Date / time
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    Device
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    Location
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    2021-06-16
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    10:46:09
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    Macbook Pro
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    Mac OS Bigsur
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button size='small' variant='contained' className='btn btn-secondary' sx={{ ml: 'auto' }}><img src={USAflag} alt='' height="12px" /> USA</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    2021-06-16
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    10:46:09
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    Macbook Pro
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    Mac OS Bigsur
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button size='small' variant='contained' className='btn btn-secondary' sx={{ ml: 'auto' }}><img src={USAflag} alt='' height="12px" /> USA</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Button variant='outlined' className='btn btn-outlined-secondary' sx={{ ml: 'auto' }}>Log out all other devices</Button>
                                        </Box>
                                    </Box>

                                    <Box className='login-history'>
                                        <Typography component="h5" variant='h5'>
                                            Login history
                                        </Typography>
                                        <Box className='session-list'>
                                            <TableContainer>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    Date / time
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    IP address
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography component="small" variant='body2' className='' sx={{ fontWeight: '600' }}>
                                                                    Used 2FA
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    2021-06-16
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    10:46:09
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    1.53.208.186
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button size='small' variant='contained' color='error' className='btn btn-error' sx={{ ml: 'auto' }}>NO</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    2021-06-16
                                                                </Typography>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                    10:46:09
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                    1.53.208.148
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button size='small' variant='contained' color='success' className='btn btn-success' sx={{ ml: 'auto' }}>YES</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Button variant='outlined' className='btn btn-outlined-secondary' sx={{ ml: 'auto' }}>Contact us</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default SessionHistory
