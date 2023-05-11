import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material'

const theme = createTheme();

const PasswordRecovery = () => {

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
                        <Typography component="h3" variant="h3" sx={{ marginBottom: '0 !important' }}>
                            Password Recovery
                        </Typography>
                        <Box component="form" >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='email'
                                id="email"
                                placeholder='Email Address'
                                name="email"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                            />
                            <Button onClick={() => { navigate("/reset-password") }} variant="contained" className='btn btn-primary'>
                                Continue
                            </Button>
                        </Box>
                        <Box className='link-new_account' component="div" sx={{ textAlign: 'center', marginTop: '40px' }}>
                            <Typography component="h5" variant="h5" sx={{ display: 'flex', gap: '10px' }}>
                                Don’t have an account?
                                <Link onClick={() => { navigate("/create-account") }} href="#" variant="body2" sx={{ color: '#2B2B2B;' }}>
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

export default PasswordRecovery
