import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from "../../_actions/user.actions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material'

import { LockOutlined} from '@mui/icons-material';
const theme = createTheme();

const ResetPassword = () => {

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().required('Old Password is required'),
        password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters.")
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
                    <Box
                        className='auth-wrapper-inner'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h3" variant="h3" sx={{ marginBottom: '0 !important' }}>
                            Reset Password
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit(userActions.resetPassword)}
                             noValidate 
                         >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="old_password"
                                placeholder='Old Password'
                                type={showPassword ? "text" : "password"}
                                name="old_password"
                                autoComplete="old_password"
                                size="small"
                                autoFocus
                                {...register('oldpassword')}
                                className={`form-control ${errors.oldpassword ? 'is-invalid' : ''}`}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),startAdornment: (
                                        <InputAdornment position="start">
                                          <LockOutlined />
                                        </InputAdornment>
                                      ), 
                                }}
                                //  InputProps={{
                                //     startAdornment: (
                                //       <InputAdornment position="start">
                                //         <LockOutlined />
                                //       </InputAdornment>
                                //     ), 
                                //   }}
                            />
                             <div className="invalid-feedback" style={{color:"red"}}>{errors.oldpassword?.message}</div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                placeholder='Password'
                                type={showPassword2 ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                size="small"
                                {...register('password')}
                                 className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                 InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword2}>
                                                {showPassword2 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),  startAdornment: (
                                        <InputAdornment position="start">
                                          <LockOutlined />
                                        </InputAdornment>
                                      ), 
                                }}              
                                autoFocus
                                //  InputProps={{
                                //     startAdornment: (
                                //       <InputAdornment position="start">
                                //         <LockOutlined />
                                //       </InputAdornment>
                                //     ), 
                                //   }}
                            />
                              <div className="invalid-feedback" style={{color:"red"}}>{errors.password?.message}</div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="confirm_password"
                                placeholder='Confirm Password'
                                type={showPassword3 ? "text" : "password"}
                                name="confirm_password"
                                autoComplete="confirm-password"
                                size="small"
                                {...register('confirmpassword')} 
                                className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`} 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword3}>
                                                {showPassword3 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),   startAdornment: (
                                        <InputAdornment position="start">
                                          <LockOutlined />
                                        </InputAdornment>
                                      ), 
                                }}
                                autoFocus
                                //  InputProps={{
                                //     startAdornment: (
                                //       <InputAdornment position="start">
                                //         <LockOutlined />
                                //       </InputAdornment>
                                //     ), 
                                //   }}
                            />
                             <div className="invalid-feedback" style={{color:"red"}}>{errors.confirmpassword?.message}</div>

                            <Button 
                                type="submit"
                                variant="contained" 
                                className='btn btn-primary'
                                disabled={isSubmitting}
                                >
                                Submit 
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ResetPassword;
