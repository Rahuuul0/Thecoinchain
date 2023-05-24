import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlertActions } from '../../_actions/alert.actions';
import { switchAtom } from '../../_state/users';
import { useUserActions } from "../../_actions/user.actions";
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoLight from '../../../public/assets/images/logo-light.svg';
import LogoDark from '../../../public/assets/images/logo.svg';
import AuthBg from '../../../public/assets/images/auth-bg.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OTPInput from "otp-input-react";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const [Soption, setSoption] = useRecoilState(switchAtom);

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

    const onSubmitFun = async () => {
        await userActions.forgotPassword(formData.email);
    }

    const onSubmitFunOTP = async () => {
        if (OTP.length < 4) {
            alertActions.error("Fill OTP first")
        }
        else {
            await userActions.forgotPasswordVerify(OTP)
        }
    }

    const [OTP, setOTP] = useState("");
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
                            <img src={LogoLight} alt='Coin Guru' className='desktop' />
                            <img src={LogoDark} alt='Coin Guru' className='ipad' />
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
                            {Soption ? <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Forgot password
                                </Typography>
                                <Typography component="small" variant="body2" sx={{ color: '#777E91', textAlign: 'center', display: 'block' }}>
                                    For security purposes, no withdrawals are permitted for 24 hours after password changed.
                                </Typography>
                                <Box className='devider' />

                                <Box component="form"
                                    onSubmit={handleSubmit(onSubmitFun)}
                                    noValidate
                                >
                                    <Box className="auth-form">

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
                                            className='btn btn-primary'
                                        >
                                            Continue
                                        </Button>
                                        <Typography onClick={() => { navigate('/login') }} component="p" variant="body2" sx={{ fontSize: '14px', textAlign: 'center', fontWeight: '700', marginTop: '24px' }}>
                                            <Link onClick={() => { navigate('/login') }} >    Nevermind, I got it  </Link>
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box> :



                                <Box onSubmit={handleSubmit(onSubmitFunOTP)} noValidate component="div" className='auth-wrapper-form-inner forgot-password' >
                                    <Typography component="h3" variant="h3">
                                        Security verification
                                    </Typography>
                                    <Box className='open-id' >
                                        <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#353945', display: 'block', marginBottom: '20px' }}>
                                            To secure your account, please complete the following verification.
                                        </Typography>
                                        <Typography component="p" variant="body-caption" sx={{ textAlign: 'center', color: '#777E90', display: 'block', marginBottom: '20px' }}>
                                            Enter the 4 digit code received by <span style={{ color: '#23262F' }}>{localStorage.getItem("email")}</span>
                                        </Typography>
                                    </Box>
                                    <Box
                                        noValidate
                                        component="form"
                                        sx={{ mt: '24px' }}
                                    >
                                        <Box justifyContent={"center"} display={"flex"} component="div" className='auth-form auth-otp'  >
                                            <OTPInput id="otp1" autoFocus type='number' variant="filled" value={OTP} onChange={setOTP} OTPLength={4} otpType="number" disabled={false} />

                                        </Box>
                                        <Box component="div" className='auth-otp-cta' >
                                            <Button type="button" variant="outlined" className='btn btn-outlined-secondary' onClick={() => { userActions.forgotPassword(formData.email) }}>
                                                Resend Code
                                            </Button>
                                            <Button type="submit" variant="contained" className='btn btn-primary' >
                                                Continue
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>}



                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ForgotPassword
