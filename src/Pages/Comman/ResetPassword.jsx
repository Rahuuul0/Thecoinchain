import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const theme = createTheme();

const ResetPassword = () => {

      // form validation rules 
      const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().required('Old Password is required'),
        password: Yup.string().required('Password is required'),
        confirmpassword: Yup.string()
           .oneOf([Yup.ref('password'), null], 'Passwords must match')
        
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
                            Reset password
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit()}
                             noValidate 
                         >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="old_password"
                                placeholder='Old Password'
                                name="old_password"
                                autoComplete="old_password"
                                size="small"
                                autoFocus
                                {...register('oldpassword')}
                                className={`form-control ${errors.oldpassword ? 'is-invalid' : ''}`}
                            />
                             <div className="invalid-feedback">{errors.oldpassword?.message}</div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="password"
                                placeholder='Password'
                                name="password"
                                autoComplete="current-password"
                                size="small"
                                {...register('password')}
                                 className={`form-control ${errors.password ? 'is-invalid' : ''}`}               
                            />
                              <div className="invalid-feedback">{errors.password?.message}</div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="confirm_password"
                                placeholder='Confirm Password'
                                name="confirm_password"
                                autoComplete="confirm-password"
                                size="small"
                                {...register('confirmpassword')} 
                                className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`} 
                            />
                             <div className="invalid-feedback">{errors.confirmpassword?.message}</div>

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
