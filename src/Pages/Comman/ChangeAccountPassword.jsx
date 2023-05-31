import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link, Breadcrumbs, Stack, TextField, OutlinedInput, MenuItem, IconButton, InputAdornment } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import FA from '../../../public/assets/images/fa.svg';
import Lockbtn from '../../../public/assets/images/lockbtn.svg';
import { NavigateNext } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Sidebar from './Components/Sidebar';

const ChangeAccountPassword = () => {

    const navigate = useNavigate();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Change password
        </Typography>,
    ];

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper session-history' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Change password
                            </Typography>
                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                                <Box  >
                                    <Breadcrumbs
                                        separator={<NavigateNext fontSize="small" />}
                                        aria-label="breadcrumb"
                                        className='center-breadcrum'
                                    >
                                        {breadcrumbs}
                                    </Breadcrumbs>
                                </Box>
                            </Box>
                        </Box>
                    </Container>

                    <Box className='subscription-steps account-main'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner '>
                                <Sidebar />
                                <Box className='subscription-steps-col-details'>
                                    <Box className='active-session'>
                                        <Typography component="h5" variant='h5'>
                                            New password
                                        </Typography>
                                    </Box>
                                    <Box component="form"
                                    >
                                        <Box component="div" className='auth-form' >
                                            <TextField
                                                label="Current Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                placeholder='Current Password'
                                                type="password"
                                                name="password"
                                                autoComplete="old-password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                className="form-control"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                <VisibilityOutlinedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                autoFocus
                                            />
                                            <TextField
                                                label="New Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                placeholder='New Password'
                                                type="password"
                                                name="password"
                                                autoComplete="current-password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                className="form-control"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                <VisibilityOutlinedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}

                                            />
                                            <TextField
                                                label="Confirm Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                placeholder='Confirm Password'
                                                type="password"
                                                name="password"
                                                autoComplete="confirm-password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                className="form-control"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                <VisibilityOutlinedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}

                                            />

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                fullWidth
                                                className='btn btn-primary'
                                            >
                                                Continue
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default ChangeAccountPassword
