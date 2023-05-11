import React from 'react'
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const theme = createTheme();

const LogIn = () => {
    const navigate = useNavigate();
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" className='auth-wrapper' maxWidth="fluid">
                    <Box
                        className='auth-wrapper-inner'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h3" variant="h3">
                            Log in
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Welcome back!
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: '24px' }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='email'
                                id="email"
                                // label="Email Address"
                                placeholder='Email Address'
                                name="email"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="password"
                                // label="Password"
                                placeholder='Password'
                                name="password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"                               
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <Box component="div" sx={{ textAlign: 'center' }}>
                                <Link onClick={() => { navigate("/forgot-password"); }} variant="body2" sx={{ color: '#2B2B2B;', textDecoration: 'none' }}>
                                    Forgot password?
                                </Link>
                            </Box>
                            <Button variant="contained" className='btn btn-primary'>
                                Log In
                            </Button>
                        </Box>
                        <Box className='link-new_account' component="div" sx={{ textAlign: 'center', marginTop: '40px' }}>
                            <Typography component="h5" variant="h5" sx={{ display: 'flex', gap: '10px' }}>
                                Don’t have an account?
                                <Link onClick={() => { navigate("/create-account"); }} href="#" variant="body2" sx={{ color: '#2B2B2B;' }}>
                                    Register here.
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default LogIn
