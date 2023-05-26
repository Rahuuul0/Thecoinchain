import React from 'react'
import {  ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button,  Link, Breadcrumbs, Stack,  InputAdornment, IconButton , TextField } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import FA from '../../../public/assets/images/fa.svg';
import Lockbtn from '../../../public/assets/images/lockbtn.svg';
import { EmailOutlined, NavigateNext ,VisibilityOutlined} from '@mui/icons-material/';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}



const Profile = () => {
   
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
                                <Box className='subscription-steps-col'>
                                    <Stack spacing={2}>
                                        <Box sx={{ borderBottom: '1px solid #E6E8EC' }} paddingBottom={2}>
                                            <Typography className='left-icon secondary-color' paddingBottom={4} fontWeight={700}><span><img src={User} /> </span>Profile</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Share} /> </span>Referrals</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={2}><span><img src={Api} /> </span>API keys</Typography>
                                        </Box>
                                        <Box paddingTop={2}>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Session} /> </span>Sessions & login history</Typography>
                                            <Typography className='left-icon secondary-color' fontWeight={700} color='#23262F' paddingBottom={4}><span><img src={FA} /> </span>2FA</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Lockbtn} /> </span>Change password</Typography>
                                        </Box>

                                    </Stack>


                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className='fa-heading-box'>
                                            <Box sx={{ paddingBottom: { xs: '20px', md: '5px' } }}>
                                                <Typography component="h3" variant='h3' className='fa secondary-font' paddingY={3} sx={{ fontWeight: '600', }} >2FA <span >Enabled</span></Typography>
                                                <Typography component="p" variant='body2' className='secondary-color small-caption  '>If you want to turn off 2FA, input your account password and the six-digit code provided by the Google Authenticator app below, then click <span className='color-dark' fontWeight={500} color='#23262F'>"Disable 2FA"</span>.</Typography>
                                            </Box>
                                        </Box>
                                        <Box >
                                            <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} paddingTop={5} paddingBottom={2}  >Disable 2FA</Typography>
                                            <Typography className='body-caption' component='p' paddingBottom={3}>Enter your password and the six-digit code provided by the Google Authenticator app to Disable the 2FA verification</Typography>
                                        </Box>
                                        <Box paddingY={2}>
                                            <Typography><span className='email-icon'><EmailOutlined /></span> schinner@ui8.net</Typography>
                                        </Box>
                                    </Box>
                                    <Grid container>
                                        <Grid items xs={12} md ={6  } marginRight={2}>
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
                                        <Grid items xs={12} md ={5}>
                                            <TextField
                                                label="2FA Code"
                                                className="form-control"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="fa"
                                                // placeholder='Email address'
                                                name="fa"
                                                autoComplete="off"
                                                size="small"
                                                autoFocus
                                                />
                                        </Grid>
                                    </Grid>
                             
                                    <Typography textAlign='right' paddingY={3}>
                                        <Button className='btn orange-btn btn-primary mobile-w-100' >Disable 2FA</Button>
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

export default Profile
