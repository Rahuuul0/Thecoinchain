import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Checkbox, Container, Box, TextField, Typography, Link, Button, FormControlLabel } from '@mui/material'
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LogoLight from '../../../public/assets/images/logo-light.svg'
import AuthBg from '../../../public/assets/images/auth-bg.svg'
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';

const CreateAccount = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email()
        .trim()
        .required("Email Address is required"),
        mobile: Yup.string().required("Mobile number is required"),
        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."),
        confirm_password: Yup.string()
            .trim()
            .required("Confirm Password is required").oneOf(
                [Yup.ref("password"), null],
                "Passwords must match."
            ),
    });

    //password eye IconButton
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const [showCnfrmPassword, setShowCnfrmPassword] = React.useState(false);

    const handleClickShowCnfrmPassword = () => setShowCnfrmPassword((show) => !show);

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

                    <Box className='auth-header'
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box className='auth-header-logo' >
                            <img src={LogoLight} alt='Coin Guru' />
                        </Box>
                        <Box className='dont-have-acc' >
                            <Typography component="p" variant="body2" sx={{ fontSize: '14px', color: '#2B2B2B;' }}>
                                Already have an account? <Link onClick={() => { navigate("/login"); }}>Login</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='auth-wrapper-inner'>
                        <Box className='auth-wrapper-bg'>
                            <img src={AuthBg} alt='Auth bg' />
                        </Box>
                        <Box className='auth-wrapper-form' >
                            <Box className='auth-wrapper-form-inner' >
                                <Typography component="h3" variant="h3">
                                    Sign up
                                </Typography>
                                <Box component="div" className='open-id' >
                                    <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                        Use Your OpenID to Sign up
                                    </Typography>
                                    <Box component="div" className='open-id-btn-wrapper' >
                                        <Button variant="contained" className='btn btn-primary' startIcon={<GoogleIcon />}>
                                            Google
                                        </Button>
                                        <Button variant="contained" className='btn btn-secondary' startIcon={<AppleIcon />}>
                                            Apple
                                        </Button>
                                    </Box>
                                </Box>
                                <Box component="div" className='devider' />
                                <Typography component="small" variant="body2" sx={{ textAlign: 'center', color: '#777E91', display: 'block', marginBottom: '20px' }}>
                                    Or continue with email
                                </Typography>
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{ mt: '24px' }}
                                    onSubmit={handleSubmit(userActions.create)}
                                >
                                    <Box component="div" className='auth-form' >
                                        <TextField
                                            onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                            label="Email"
                                            className="form-control"
                                            type="email"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            placeholder='Email address'
                                            name="email"
                                            autoComplete="off"
                                            size="small"
                                            autoFocus
                                            {...register("email")}
                                        />
                                        <div style={{ color: "red" }}>{errors.email?.message}
                                        </div>
                                        <TextField
                                            onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                            label="Mobile"
                                            className="form-control"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="mobile"
                                            placeholder='Mobile Number'
                                            name="mobile"
                                            autoComplete="off"
                                            size="small"
                                            {...register("mobile")}
                                        />
                                        <div style={{ color: "red" }}>{errors.mobile?.message}
                                        </div>
                                        <TextField
                                            onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                            margin="normal"
                                            required
                                            type={showPassword ? "text" : "password"}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            id="password"
                                            label="Password"
                                            placeholder='Password'
                                            name="password"
                                            autoComplete="off"
                                            size="small"
                                            autoFocus
                                            className="form-control"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword}>
                                                            {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register("password")}
                                        /><div style={{ color: "red" }}> {errors.password?.message}
                                        </div>
                                        <TextField
                                            onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                            margin="normal"
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            type={showCnfrmPassword ? "text" : "password"}
                                            fullWidth
                                            id="confirm_password"
                                            label="Confirm Password"
                                            placeholder='Confirm Password'
                                            name="confirm_password"
                                            autoComplete="off"
                                            size="small"
                                            autoFocus
                                            className="form-control"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowCnfrmPassword}>
                                                            {showCnfrmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register("confirm_password")}
                                        />
                                        <div style={{ color: "red" }}> {errors.confirm_password?.message}
                                        </div>

                                        <FormControlLabel className='auth-checkbox' control={<Checkbox defaultChecked />} label="By signing up I agree that I’m 18 years of age or older, to the User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent." />
                                        <Button type="submit" variant="contained" className='btn btn-primary'>
                                            Sign up
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default CreateAccount
