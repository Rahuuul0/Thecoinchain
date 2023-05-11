import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const theme = createTheme();

const PasswordRecovery = () => {

      // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
      });
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
                        <Typography component="h3" variant="h3" sx={{ marginBottom: '0 !important' }}>
                            Password Recovery
                        </Typography>
                        <Box component="form" 
                            onSubmit={handleSubmit()}
                            noValidate
                         >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='email'
                                id="email"
                                placeholder='Email Address'
                                name="email"
                                autoComplete="email"
                                size="small"
                                autoFocus
                                {...register("email")}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            />
                              <div className="invalid-feedback" style={{ color: "red", width: '300px' }}>{errors.email?.message}</div>
                            <Button
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                loadingPosition="end" 
                                disabled={isSubmitting}
                                className='btn btn-primary'>
                                Continue
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
            </ThemeProvider>
        </>
    )
}

export default PasswordRecovery
