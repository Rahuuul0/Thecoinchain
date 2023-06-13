import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions/user.actions"
import { yupResolver } from "@hookform/resolvers/yup";
import { MuiTelInput } from 'mui-tel-input'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAlertActions } from '../../_actions/alert.actions';
import {  loaderAtom } from '../../_state';
import {  useRecoilValue } from 'recoil';
import * as Yup from "yup";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {KeyboardArrowLeft} from '@mui/icons-material/';
import IconButton from "@mui/material/IconButton"; 
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogoLight from '../../../public/assets/images/logo-light.svg'
import LogoDark from '../../../public/assets/images/logo.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'
import Lock from '../../../public/assets/images/icons/lock.svg'
import GoogleLogin from "./GoogleLogin.jsx";
import AppleIcon from '@mui/icons-material/Apple';


const LogIn = () => {

    const [value, setValue] = useState('1');
    const loader = useRecoilValue(loaderAtom);

    // Mobile contry code 
    const [phone, setPhone] = useState('')
    const handlePhone = (newPhone) => {
        setPhone(newPhone)
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userActions = useUserActions();
    const navigate = useNavigate();
    const alertActions = useAlertActions();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email")
            .trim()
            .required("Email Address is required"),
        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            ),
    });
    const validationSchemaMobile = Yup.object().shape({
        number: Yup.string()
            .trim()
            .required("Mobile number is required"),
        passwordMob: Yup.string()
            .trim()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            ),
    });

    //password eye IconButton
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    //yup validation
    const formOptions = { resolver: yupResolver(value == 1 ? validationSchema : validationSchemaMobile) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
    const { errors, isSubmitted } = formState;

    const formData = watch();

    const handleFormSubmit = () => {
        if (value == 1) {
            userActions.login(formData)
        }
        else {
            userActions.loginMobile(formData)
        }

    }
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
                            <Link onClick={() => { navigate('/') }}><img src={LogoLight} alt='Coin Guru' className='desktop' /></Link>
                            <Link onClick={() => { navigate('/') }}><img src={LogoDark} alt='Coin Guru' className='ipad' /></Link>
                        </Box>
                        <Box className='dont-have-acc' >
                            <Typography component="p" position='relative' zIndex='2' variant="body2" sx={{ fontSize: '14px', color: '#2B2B2B;' }}>
                                Don’t have an account? <Link onClick={() => { navigate("/create-account"); }}>Sign up for free</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box className='auth-wrapper-form' position='relative'>
                            <Box position='absolute' sx={{ top: '90px' }}>
                                <IconButton onClick={()=>{navigate('/')}} aria-label="delete" className='btn-primary btn' variant="outlined" sx={{ padding: '4px 4px !important', margin: '0px !important' }}>
                                    <KeyboardArrowLeft />
                                </IconButton>
                            </Box>
                            <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Sign in to CoinGuru
                                </Typography>
                                <Box className='ensure' >
                                    <Typography component="caption" variant="body2" sx={{ color: '#777E91', display: 'block', fontSize: '12px' }}>
                                        Please ensure you are visiting the correct url.
                                    </Typography>
                                    <Box className='ensure-link' >
                                        <img src={Lock} alt='lock' />
                                        <span>https://</span> accounts.coinguru.org/login
                                    </Box>
                                </Box>
                                <Box className='open-id' >
                                    <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                        Use Your OpenID to Sign In
                                    </Typography>
                                    <Box component="div" className='open-id-btn-wrapper' >
                                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>

                                            <GoogleLogin />
                                        </GoogleOAuthProvider>
                                        <Button variant="contained" className='btn btn-secondary' startIcon={<AppleIcon />}>
                                            Apple
                                        </Button>
                                    </Box>
                                </Box>
                                <Box className='devider' />

                                <Box
                                    noValidate
                                    component="form"
                                    sx={{ mt: '24px' }}
                                    onSubmit={handleSubmit(handleFormSubmit)}
                                >
                                    <Box className='auth-form' >
                                        <Box sx={{ width: '100%', typography: 'body1' }}>
                                            <TabContext value={value}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <TabList onChange={handleChange} aria-label="Login Tabs">
                                                        <Tab label="Email" value="1" />
                                                        <Tab label="Mobile" value="2" />
                                                    </TabList>
                                                </Box>
                                                <TabPanel value="1" sx={{ p: 0 }}>
                                                    <TextField
                                                        label="Email *"
                                                        className="form-control"
                                                        type="email"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        variant="standard"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        placeholder='Email address'
                                                        name="email"
                                                        autoComplete="off"
                                                        size="small"
                                                        autoFocus
                                                        {...register("email")}
                                                        onChange={(e) => reset({ ...formData, email: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                                    />
                                                    <div style={{ color: "red" }}>{errors.email?.message}</div>

                                                    <TextField
                                                        label="Password *"
                                                        className="form-control"
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
                                                        type={showPassword ? "text" : "password"}
                                                        {...register("password")}
                                                        onChange={(e) => reset({ ...formData, password: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton onClick={handleClickShowPassword}>
                                                                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <div style={{ color: "red" }}> {errors.password?.message}
                                                    </div>
                                                    <Box className='scan-forgot'>
                                                        <Link href='#' onClick={() => { navigate("/scan-to-login"); }} variant="body2" sx={{ color: '#777E91!important', textDecoration: 'none' }}>
                                                            Scan to login
                                                        </Link>
                                                        <Link href='#' onClick={() => { navigate("/forgot-password"); }} variant="body2" sx={{ color: '#3772FF', textDecoration: 'none' }}>
                                                            Forgot password?
                                                        </Link>
                                                    </Box>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        className='btn btn-primary'
                                                        disabled={loader}>
                                                        Login
                                                    </Button>
                                                </TabPanel>
                                                <TabPanel value="2" sx={{ p: 0 }}>

                                                    <MuiTelInput
                                                        label="Number *"
                                                        className="form-control"
                                                        variant="standard"
                                                        required
                                                        margin="normal"
                                                        fullWidth
                                                        placeholder='Number'
                                                        autoComplete="off"
                                                        size="small"
                                                        autoFocus
                                                        {...register("number")}
                                                        value={phone}
                                                        onChange={handlePhone}
                                                    />
                                                    <div style={{ color: "red" }}>{errors.number?.message}
                                                    </div>

                                                    <TextField
                                                        label="Password *"
                                                        className="form-control"
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
                                                        type={showPassword ? "text" : "password"}
                                                        {...register("passwordMob")}
                                                        onChange={(e) => reset({ ...formData, passwordMob: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton onClick={handleClickShowPassword}>
                                                                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <div style={{ color: "red" }}> {errors.passwordMob?.message}</div>

                                                    <Box className='scan-forgot'>
                                                        <Link href='#' onClick={() => { navigate("/scan-to-login"); }} variant="body2" sx={{ color: '#777E91!important', textDecoration: 'none' }}>
                                                            Scan to login
                                                        </Link>
                                                        <Link href='#' onClick={() => { navigate("/password-recovery"); }} variant="body2" sx={{ color: '#3772FF', textDecoration: 'none' }}>
                                                            Forgot password?
                                                        </Link>
                                                    </Box>

                                                    <Button 
                                                        type="submit"
                                                        variant="contained"
                                                        className='btn btn-primary'
                                                    >
                                                        Login
                                                    </Button>
                                                </TabPanel>
                                            </TabContext>
                                        </Box>
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
export default LogIn;

