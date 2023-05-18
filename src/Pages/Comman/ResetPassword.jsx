import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from "../../_actions/user.actions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material'
import LogoLight from '../../../public/assets/images/logo-light.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'

const ResetPassword = () => {
    const navigate = useNavigate();

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("New Password Required")
            .min(8, "New Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            ),
        confirmpassword: Yup.string().required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

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
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box component="div" className='auth-wrapper-form' >
                            <Box component="div" className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    New Password
                                </Typography>
                                <Box component="form"
                                    onSubmit={handleSubmit(userActions.resetPassword)}
                                    noValidate
                                >
                                    <Box component="div" className='auth-form' >
                                        <TextField
                                            label="New Password"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            placeholder='Password'
                                            type={showPassword2 ? "text" : "password"}
                                            name="password"
                                            autoComplete="current-password"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            {...register('password')}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword2}>
                                                            {showPassword2 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            autoFocus
                                        />
                                        <div className="invalid-feedback" style={{ color: "red" }}>{errors.password?.message}</div>
                                        <TextField
                                            label="Confirm New Password"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="confirm_password"
                                            placeholder='Confirm Password'
                                            type={showPassword3 ? "text" : "password"}
                                            name="confirm_password"
                                            autoComplete="confirm-password"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            {...register('confirmpassword')}
                                            className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
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
                                        <div className="invalid-feedback" style={{ color: "red" }}>{errors.confirmpassword?.message}</div>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className='btn btn-primary'
                                            disabled={isSubmitting}
                                        >
                                            Continue
                                        </Button>
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

export default ResetPassword;
