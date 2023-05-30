import React from 'react'
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import LogoLight from '../../../public/assets/images/logo-light.svg';
import LogoDark from '../../../public/assets/images/logo.svg';
import AuthBg from '../../../public/assets/images/auth-bg.svg';
import Lock from '../../../public/assets/images/icons/lock.svg';
import ScanImg from '../../../public/assets/images/scan-img.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ScanToLogin = () => {
    const navigate = useNavigate();
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" className='auth-wrapper scan-to-login' maxWidth="fluid">
                    <Box className='auth-header'
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box className='auth-header-logo' >
                            <img src={LogoLight} alt='Coin Guru' className='desktop' />
                            <img src={LogoDark} alt='Coin Guru' className='ipad' />
                        </Box>
                        <Box className='dont-have-acc' >
                            <Typography component="p" variant="body2" onClick={() => { navigate("/create-account"); }} sx={{ fontSize: '14px', color: '#2B2B2B;' }}>
                                Don’t have an account? <Link>Sign up for free</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box className='auth-wrapper-form' >
                            <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Sign in to CoinGuru
                                </Typography>
                                <Box className='ensure' >
                                    <Typography component="small" variant="body2" sx={{ color: '#777E91', display: 'block', textAlign: 'center' }}>
                                        Please ensure you are visiting the correct url.
                                    </Typography>
                                    <Box className='ensure-link' >
                                        <img src={Lock} alt='lock' />
                                        <span>https://</span> accounts.coinguru.org/login
                                    </Box>
                                </Box>
                                <Box className='devider' />
                                <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                    Please use your CoinGuru app to scan BC code to log in .
                                </Typography>
                                <Box

                                    className='scanner'
                                    sx={{ mt: '24px' }}
                                >
                                    <Box className='scanner-inner' >
                                        <img src={ScanImg} alt='scanner' />
                                    </Box>
                                </Box>
                                <Button onClick={() => { navigate("/login"); }} variant="contained" className='btn btn-primary' startIcon={<ChevronLeftIcon />}>
                                    Go Back
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ScanToLogin
