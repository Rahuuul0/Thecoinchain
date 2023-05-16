import { useNavigate } from "react-router-dom";
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useUserActions } from "../../_actions/user.actions"
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoLight from '../../../public/assets/images/logo-light.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const theme = createTheme();

const PasswordRecovery = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .trim()
            .required("Email Address is required"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    const formData = watch();
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
                            <Typography component="p" variant="body2" sx={{ fontSize: '14px', color: '#2B2B2B;' }}>
                                Don’t have an account? <Link onClick={() => { navigate("/create-account"); }}>Sign up for free</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box className='auth-wrapper-form' >
                            {/* <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Forgot password
                                </Typography>
                                <Typography component="small" variant="body2" sx={{ color: '#777E91', textAlign: 'center', display: 'block' }}>
                                    For security purposes, no withdrawals are permitted for 24 hours after password changed.
                                </Typography>
                                <Box component="div" className='devider' />

                                <Box component="form"
                                    onSubmit={handleSubmit(userActions.passwordRecovery)}
                                    noValidate
                                >
                                    <Box component="div" className="auth-form">

                                        <TextField
                                            label="Enter the account email"
                                            margin="normal"
                                            required
                                            fullWidth
                                            type='email'
                                            id="email"
                                            placeholder='Your email'
                                            name="email"
                                            autoComplete="email"
                                            size="small"
                                            className="form-control"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton >
                                                            <MailOutlineIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register("email")}
                                        />
                                        <div style={{ color: "red" }}>{errors.email?.message}</div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className='btn btn-primary'>
                                            Continue
                                        </Button>
                                        <Typography onClick={() => { navigate('/login') }} component="p" variant="body2" sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '700', marginTop: '24px' }}>
                                            Nevermind, I got it
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box> */}



                            <Box component="div" className='auth-wrapper-form-inner forgot-password' >
                                <Typography component="h3" variant="h3">
                                    Security verification
                                </Typography>
                                <Box component="div" className='open-id' >
                                    <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#353945', display: 'block', marginBottom: '20px' }}>
                                        To secure your account, please complete the following verification.
                                    </Typography>
                                    <Typography component="p" variant="body-caption" sx={{ textAlign: 'center', color: '#777E90', display: 'block', marginBottom: '20px' }}>
                                        Enter the 6 digit code received by <span style={{ color: '#23262F' }}>t*m@u*8.net</span>
                                    </Typography>
                                </Box>
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{ mt: '24px' }}
                                >
                                    <Box component="div" className='auth-form auth-otp' >
                                        <TextField id="otp1" autoFocus type='text' variant="filled" />
                                        <TextField id="otp2" type='text' variant="filled" />
                                        <TextField id="otp3" type='text' variant="filled" />
                                        <TextField id="otp4" type='text' variant="filled" />
                                    </Box>
                                    <Box component="div" className='auth-otp-cta' >
                                        <Button type="submit" variant="outlined" className='btn btn-outlined-secondary'>
                                            Resend Code
                                        </Button>
                                        <Button type="submit" variant="contained" className='btn btn-primary' onClick={() => { navigate("/reset-password"); }}>
                                            Continue
                                        </Button>
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

export default PasswordRecovery
