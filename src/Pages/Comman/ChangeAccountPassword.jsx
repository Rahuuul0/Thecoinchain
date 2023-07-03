import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Button, Breadcrumbs, TextField, IconButton, InputAdornment } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Sidebar from './Components/Sidebar';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserActions } from "../../_actions/user.actions";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const ChangeAccountPassword = () => {

    const navigate = useNavigate();
    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        old_password: Yup.string()
            .required("Old Password is required"),
        new_password: Yup.string()
            .required("New Password is required")
            .min(8, "New Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            ),
        confirm_password: Yup.string().required('Confirm Password is required')
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    //password eye IconButton
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const [showPassword3, setShowPassword3] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleClickShowPassword3 = () => setShowPassword3((show) => !show);


    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/">
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
                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', paddingTop: { xs: '10px', md: '0px' } }}>
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
                                <Box className='subscription-steps-col-details change-password-box'>
                                    <Box className='active-session'>
                                        <Typography component="h3" variant='h3' className='secondary-font' textAlign={"center"} marginBottom={4}>
                                            New password
                                        </Typography>
                                    </Box>
                                    <Box component="form"
                                        onSubmit={handleSubmit(userActions.changePassword)}
                                        noValidate
                                    >
                                        <Box component="div" className='auth-form' >
                                            <TextField
                                                label="Current Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="old_password"
                                                placeholder='Current Password'
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                autoComplete="old_password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                {...register('old_password')}
                                                className={`form-control ${errors.old_password ? 'is-invalid' : ''}`}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword}>
                                                                {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                autoFocus
                                            />
                                            <div className="invalid-feedback" style={{ color: "red" }}>{errors.old_password?.message}</div>
                                            <TextField
                                                label="New Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                placeholder='New Password'
                                                type={showPassword2 ? "text" : "password"}
                                                name="password"
                                                autoComplete="current-password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                {...register('new_password')}
                                                className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword2}>
                                                                {showPassword2 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}

                                            />
                                            <div className="invalid-feedback" style={{ color: "red" }}>{errors.new_password?.message}</div>
                                            <TextField
                                                label="Confirm New Password"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="confirm_password"
                                                placeholder='Confirm New Password'
                                                type={showPassword3 ? "text" : "password"}
                                                name="confirm_password"
                                                autoComplete="confirm-password"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                {...register('confirm_password')}
                                                className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword3}>
                                                                {showPassword3 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <div className="invalid-feedback" style={{ color: "red" }}>{errors.confirm_password?.message}</div>

                                            <LoadingButton
                                                type="submit"
                                                loading={isSubmitting}
                                                loadingPosition="end"
                                                variant="contained"
                                                className='btn btn-primary'
                                                fullWidth
                                                disabled={isSubmitting}
                                                sx={{ ml: 'auto', mt: { xs: '30px ', md: '30px' } }}
                                            >
                                                {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1">Loading</span> : "Continue"}
                                            </LoadingButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default ChangeAccountPassword
