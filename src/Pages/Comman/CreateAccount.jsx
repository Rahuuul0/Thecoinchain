import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { EmailOutlined , PersonOutlineOutlined, LockOutlined} from '@mui/icons-material';

const theme = createTheme();

const CreateAccount = () => {
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
                            Create Account
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Welcome! enter your details and start Getting Rich!
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: '24px' }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='text'
                                id="username"
                                // label="Email Address"
                                placeholder='Username'
                                name="username"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonOutlineOutlined />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
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
                                        <EmailOutlined />
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
                                        <LockOutlined />
                                      </InputAdornment>
                                    ), 
                                  }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="confirm_password"
                                // label="Password"
                                placeholder='Confirm Password'
                                name="confirm_password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined />
                                      </InputAdornment>
                                    ), 
                                  }}
                            />
                            <Button onClick={() => { navigate("/login") }} variant="contained" className='btn btn-primary'>
                                Create account
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default CreateAccount
