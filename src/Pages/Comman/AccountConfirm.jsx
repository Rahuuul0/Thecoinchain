import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Checkbox, Container, Box, TextField, Typography, Link, Button, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from '@mui/material'
import IconButton from "@mui/material/IconButton";
import LogoLight from '../../../public/assets/images/logo-light.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const theme = createTheme();

const AccountConfirm = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" className='auth-wrapper' maxWidth="fluid">
                    <Box component="div" className='auth-header'
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box component="div" className='auth-header-logo' >
                            <img src={LogoLight} alt='Coin Guru' />
                        </Box>
                        <Box component="div" className='dont-have-acc' >
                            <Typography component="p" variant="body2" sx={{ fontSize: '14px', color: '#2B2B2B;' }}>
                                Already have an account? <Link onClick={() => { navigate("/login"); }}>Login</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="div" className='auth-wrapper-inner'>
                        <Box component="div" className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box component="div" className='auth-wrapper-form' >
                            {/* <Box component="div" className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Let’s confirm it’s really you
                                </Typography>
                                <Box component="div" className='open-id' >
                                    <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                        Help us secure your account.<br />Please complete the verifications below
                                    </Typography>
                                </Box>
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{ mt: '24px' }}
                                >
                                    <Box component="div" className='auth-form' >
                                        <FormControl className='confirm-account'>
                                            <RadioGroup
                                                aria-labelledby="confirm account"
                                                defaultValue="by_mobile"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="by_mobile" control={<Radio />} label="Get the code by text message (SM) at +1 234 567 890" />
                                                <Box component="div" className='devider' />
                                                <FormControlLabel value="by_email" control={<Radio />} label="Get the code by email at tranm••••••••••••@gm•••.com" />
                                            </RadioGroup>
                                        </FormControl>

                                        <Button type="submit" variant="contained" className='btn btn-primary' endIcon={<KeyboardArrowRightIcon />}>
                                            Continue
                                        </Button>
                                    </Box>
                                </Box>
                            </Box> */}

                            {/* OTP */}

                            <Box component="div" className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Enter your security code
                                </Typography>
                                <Box component="div" className='open-id' >
                                    <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                        We texted your code to +1 234 567 890
                                    </Typography>
                                </Box>
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{ mt: '24px' }}
                                >
                                    <Box component="div" className='auth-form auth-otp' >
                                        <TextField id="otp1" variant="filled" />
                                        <TextField id="otp2" variant="filled" />
                                        <TextField id="otp3" variant="filled" />
                                        <TextField id="otp4" variant="filled" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default AccountConfirm
