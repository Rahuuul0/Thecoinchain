import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from "../../_actions/user.actions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import LogoLight from '../../../public/assets/images/logo-light.svg';
import LogoDark from '../../../public/assets/images/logo.svg';
import AuthBg from '../../../public/assets/images/auth-bg.svg';
import LoadingButton from '@mui/lab/LoadingButton';

const ChangePassword = () => {
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
                            <Link onClick={() => { navigate('/') }}><img src={LogoLight} alt='Coin Guru' className='desktop' /></Link>
                            <Link onClick={() => { navigate('/') }}><img src={LogoDark} alt='Coin Guru' className='ipad' /></Link>
                        </Box>
                    </Box>
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box className='auth-wrapper-form' position='relative'>
                            <Box position='absolute'  sx={{ top: {xs: '20px' , md: '90px'}  }}>
                                <IconButton aria-label="delete" className='btn-primary btn' variant="outlined" sx={{ padding: '4px 4px !important', margin: '0px !important' }}>
                                    <KeyboardArrowLeft />
                                </IconButton>
                            </Box>
                            <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Change Password
                                </Typography>
                                <Box component="form"
                                    onSubmit={handleSubmit(userActions.changePassword)}
                                    noValidate
                                >
                                    <Box component="div" className='auth-form' >
                                        <TextField
                                            label="Old Password"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            placeholder='Old Password'
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            autoComplete="old-password"
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
                                            autoFocus
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
                                            {isSubmitting? <span className="spinner-border spinner-border-sm mr-1">Loading</span>:"Continue"}
                                            </LoadingButton>
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

export default ChangePassword;
