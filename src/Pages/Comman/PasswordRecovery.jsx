import { useNavigate } from "react-router-dom";
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useUserActions } from "../../_actions/user.actions"
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const theme = createTheme();

const PasswordRecovery = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();

      // form validation rules
    const validationSchema = Yup.object().shape({
          email: Yup.string()
          .email()
          .trim()
          .required("Email Address is required"),
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
      const { register, handleSubmit, formState, reset, watch  } = useForm(formOptions);
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
                            Password Recovery
                        </Typography>
                        <Box component="form" 
                             onSubmit={handleSubmit(userActions.passwordRecovery)}
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
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  {...register("email")}
                                className="form-control"
                            />
                              <div style={{ color: "red" }}>{errors.email?.message}</div>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn btn-primary'>
                                Continue
                            </Button>
                        </Box>
                        <Box className='link-new_account' component="div" sx={{ textAlign: 'center', marginTop: '40px' }}>
                            <Typography component="h5" variant="h5" sx={{ display: 'flex', gap: '10px' }}>
                                Don’t have an account?
                                <Link onClick={()=>{navigate('/create-account')}} variant="body2" sx={{ color: '#2B2B2B;' }}>
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
