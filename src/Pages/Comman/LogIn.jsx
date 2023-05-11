import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const theme = createTheme();

const LogIn = () => {
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
                            />
                            <Box component="div" sx={{ textAlign: 'center' }}>
                                <Link href="#" variant="body2" sx={{ color: '#2B2B2B;', textDecoration: 'none' }}>
                                    Forget password?
                                </Link>
                            </Box>
                            <Button variant="contained" className='btn btn-primary'>
                                Log In
                            </Button>
                        </Box>
                        <Box className='link-new_account' component="div" sx={{ textAlign: 'center', marginTop: '40px' }}>
                            <Typography component="h5" variant="h5" sx={{ display: 'flex', gap: '10px' }}>
                                Don’t have an account?
                                <Link href="#" variant="body2" sx={{ color: '#2B2B2B;' }}>
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
