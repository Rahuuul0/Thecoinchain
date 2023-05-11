import React from 'react'
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material'
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const theme = createTheme();

const LogIn = () => {

    const userActions = useUserActions();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .trim()
            .required("Email Address is required"),
        password: Yup.string()
            .trim()
            .required("Password is required")
    });

    //password eye IconButton
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    //yup validation
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const formData = watch();
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
                            noValidate
                            component="form"
                            sx={{ mt: '24px' }}
                            onSubmit={handleSubmit(userActions.login)}
                        >
                            <TextField
                                onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })} 
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
                                {...register("email")}
                                
                            />
                            <div style={{ color: "red" }}>{errors.email?.message}
                            </div>
                            <TextField
                                onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                margin="normal"
                                required
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                id="password"
                                // label="Password"
                                placeholder='Password'
                                name="password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                {...register("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div style={{ color: "red" }}> {errors.password?.message}
                            </div>
                            <Box component="div" sx={{ textAlign: 'center' }}>
                                <Link onClick={() => { navigate("/forgot-password"); }} variant="body2" sx={{ color: '#2B2B2B;', textDecoration: 'none' }}>
                                    Forgot password?
                                </Link>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn btn-primary'
                                disabled={isSubmitting}>
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
