import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from '@mui/lab/LoadingButton';

const theme = createTheme();

const Login = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email Address / email is required"),
        password: Yup.string()
          .required("Password is required")
      });    

        //password eye IconButton
     const [showPassword, setShowPassword] = React.useState(false);

     const handleClickShowPassword = () => setShowPassword((show) => !show);

      //yup validation
      const formOptions = { resolver: yupResolver(validationSchema) };
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
                        <Typography component="h3" variant="h3">
                            Log in
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Welcome back!
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: '24px' }}
                            onSubmit={handleSubmit(Login)}
                        >
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
                                {...register("email")} 
                            />
                            <TextField
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
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <div className="invalid-feedback" >
              {errors.password?.message}
            </div>
                            <Box component="div" sx={{ textAlign: 'center' }}>
                                <Link href="#" variant="body2" sx={{ color: '#2B2B2B;', textDecoration: 'none' }}>
                                    Forget password?
                                </Link>
                            </Box>
                            <Button variant="contained" className='btn btn-primary'>
                                Log In
                            </Button>
                        </Box>
                        <Box className='link-new_account' component="div" sx={{ textAlign: 'center', marginTop: '40px' }}>
                            <Typography component="h5" variant="h5" sx={{ display: 'flex', gap: '10px' }}>
                                Don’t have an account?
                                <Link href="#" variant="body2" sx={{ color: '#2B2B2B;' }}>
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

export default Login
