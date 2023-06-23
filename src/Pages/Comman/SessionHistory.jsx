import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Link, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { userLoginHistoryActions } from '../../_actions';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import USAflag from '../../../public/assets/images/icons/usa.svg';
import Sidebar from './Components/Sidebar';
import ReactCountryFlag from "react-country-flag"
import { useDeviceData, useDeviceSelectors, isMacOs } from "react-device-detect";
import dayjs from "dayjs";


const SessionHistory = () => {

    const userHistoryAction = userLoginHistoryActions();
    const [historyData, setHistoryData] = useState([]);
    const navigate = useNavigate();
    const deviceData = useDeviceData();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Sessions & login history
        </Typography>,
    ];
    const yesNo = [
        {
            date: "2021-06-16",
            time: "10:46:09",
            ip: "1.53.208.186",
            cta: "YES",
        },

        {
            date: "2021-06-16",
            time: "10:46:09",
            ip: "1.53.208.148",
            cta: "NO",
        }
    ];

    // Subscription action get function   API data call 
    useEffect(() => {
        const response = userHistoryAction.getAll()
        response.then((res) => { setHistoryData([...res]) })

    }, [])

    const historyDataSort = historyData.sort().reverse();

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper session-history' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Sessions & login history
                            </Typography>
                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', paddingTop: { xs: '10px', md: '0px' } }}>
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

                    <Box className='subscription-steps account-main'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner '>
                                <Sidebar />
                                <Box className='subscription-steps-col-details'>
                                    <Box className='active-session'>
                                        <Typography component="h5" variant='h5'>
                                            Active sessions
                                        </Typography>
                                        <Box className='session-list'>
                                            <TableContainer sx={{ maxHeight: 440, paddingRight: '18px' }}>
                                                <Table stickyHeader aria-label="sticky table" sx={{ minWidth: { xs: '250px', md: '650px' } }}>
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
                                                        {historyDataSort.map((item, i) => {
                                                            return (
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                            {dayjs(item.created_at).format(
                                                                                "MM/DD/YY - HH:mm:ss"
                                                                            )}
                                                                        </Typography>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>

                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                            {deviceData.device.model}
                                                                        </Typography>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                            {deviceData.os.name}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Button
                                                                            size='small'
                                                                            variant='contained'
                                                                            className='btn btn-secondary btn-table' sx={{ ml: 'auto' }}>
                                                                            <ReactCountryFlag countryCode={item.country_code} />{item.country_code}
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Button variant='outlined' className='btn btn-outlined-secondary mobile-w-100' sx={{ ml: 'auto', marginY: { xs: '40px ', md: '40px' } }}>Log out all other devices</Button>
                                        </Box>
                                    </Box>

                                    <Box className='login-history'>
                                        <Typography component="h5" variant='h5'>
                                            Login history
                                        </Typography>
                                        <Box className='session-list'>
                                            <TableContainer sx={{ maxHeight: 440, paddingRight: '18px' }}>
                                                <Table stickyHeader aria-label="sticky table" sx={{ minWidth: { xs: '250px', md: '650px' } }}>
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
                                                        {historyDataSort.map((v, i) => {
                                                            return (
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                            {dayjs(v.created_at)
                                                                                .format(
                                                                                    "MM/DD/YY - HH:mm:ss"
                                                                                )}
                                                                        </Typography>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90' }}>
                                                                            {v.time}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography component="p" variant='body2' className='body-caption' sx={{ fontWeight: '500' }}>
                                                                            {v.ip_address}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Button size='small' variant='contained' color={(v.cta === "NO") ? "error" : "success"} className={(v.cta === "NO") ? "btn btn-table btn-error" : "btn btn-table btn-success"} sx={{ ml: 'auto' }}>{v.cta} Yes</Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Button onClick={() => { navigate('/contact') }} variant='outlined' className='btn btn-outlined-secondary mobile-w-100' sx={{ ml: 'auto', marginY: { xs: '40px ', md: '40px' } }}>Contact us</Button>
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
