import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Link, Breadcrumbs, Stack, InputAdornment, IconButton, TextField } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import FA from '../../../public/assets/images/fa.svg';
import Lockbtn from '../../../public/assets/images/lockbtn.svg';
import { EmailOutlined, NavigateNext, VisibilityOutlined } from '@mui/icons-material/';
import ScanImg from '../../../public/assets/images/scan-img.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const TwoFaDisable = () => {

    const navigate = useNavigate();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            2FA
        </Typography>,
    ];

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                2FA
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

                    <Box className='subscription-steps account-main'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner'>
                                <Sidebar />
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className='fa-heading-box'>
                                            <Box sx={{ paddingBottom: { xs: '20px', md: '5px' } }}>
                                                <Typography component="h3" variant='h3' className='fa-disabled secondary-font' paddingY={3} sx={{ fontWeight: '600', }} >2FA <span >Disabled</span></Typography>
                                                <Typography component="p" variant='body2' className='secondary-color small-caption  '>If you want to turn on 2FA, input your account password and the six-digit code provided by the Google Authenticator app below, then click <span className='color-dark' fontWeight={500}>"Enable 2FA".</span></Typography>
                                            </Box>
                                        </Box>
                                        <Box >
                                            <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} paddingTop={5} paddingBottom={2}  >Enable 2FA</Typography>
                                            <Typography className='body-caption' component='p' paddingBottom={3}>Enter your password and scan SQ code by the Google Authenticator app to Enable the 2FA verification</Typography>
                                        </Box>
                                        <Box paddingY={2}>
                                            <Typography><span className='email-icon'><EmailOutlined /></span> schinner@ui8.net</Typography>
                                        </Box>
                                    </Box>
                                    <Grid container>
                                        <Grid items xs={12} md={12} >
                                            <TextField
                                                label="Password"
                                                className="form-control"
                                                type="password"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                placeholder='Password'
                                                name="password"
                                                autoComplete="off"
                                                size="small"
                                                autoFocus
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton >
                                                                <VisibilityOutlined />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid items xs={12} md={12}>
                                            <Box
                                                justifyContent='center'

                                                className='scanner'
                                                sx={{ mt: '24px' }}
                                            >
                                                <Box className='scanner-inner' >
                                                    <img src={ScanImg} alt='scanner' />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Typography textAlign='right' paddingY={3}>
                                        <Button className='btn btn-success btn-primary mobile-w-100' sx={{ margin: '0 auto' }} >Enable 2FA</Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Container>
                    </Box>

                </Box >
            </ThemeProvider>
        </>
    )
}

export default TwoFaDisable
