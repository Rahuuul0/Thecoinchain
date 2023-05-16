import React from 'react'
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions/user.actions"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAlertActions } from '../../_actions/alert.actions';
import LogoLight from '../../../public/assets/images/logo-light.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'
import Lock from '../../../public/assets/images/icons/lock.svg'
import ScanImg from '../../../public/assets/images/scan-img.png'

const theme = createTheme();

const ScanToLogin = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" className='auth-wrapper' maxWidth="fluid">
                    <Box className='auth-header'
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box className='auth-header-logo' >
                            <img src={LogoLight} alt='Coin Guru' />
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
                                <Box component="div" className='ensure' >
                                    <Typography component="p" variant="body2" sx={{ color: '#777E91' }}>
                                        Please ensure you are visiting the correct url.
                                    </Typography>
                                    <Box component="div" className='ensure-link' >
                                        <img src={Lock} alt='lock' />
                                        <span>https://</span> accounts.coinguru.org/login
                                    </Box>
                                </Box>
                                <Box component="div" className='devider' />
                                <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                    Please use your CoinGuru app to scan BC code to log in .
                                </Typography>
                                <Box
                                    component="div"
                                    className='scanner'
                                    sx={{ mt: '24px' }}
                                >
                                    <Box component="div" className='scanner-inner' >
                                        <img src={ScanImg} alt='scanner' />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ScanToLogin
