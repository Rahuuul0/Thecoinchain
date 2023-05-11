import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material'

const theme = createTheme();

const ResetPassword = () => {
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
                            Reset password
                        </Typography>
                        <Box component="form" >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="old_password"
                                placeholder='Old Password'
                                name="old_password"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="confirm_password"
                                placeholder='Confirm Password'
                                name="confirm_password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                            />
                            <Button variant="contained" className='btn btn-primary'>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default ResetPassword
