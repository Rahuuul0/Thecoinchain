import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from "../../_actions/user.actions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const theme = createTheme();

const CreatePassword = () => {

    const userActions = useUserActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string().required('Confirm password is required')
           .oneOf([Yup.ref('newPassword'), null], 'Confirm passwords must match')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    //password eye IconButton
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

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
                            Create New Password
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit(userActions.createPassword)}
                             noValidate 
                         >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="new_password"
                                placeholder='New Password'
                                type={showPassword ? "text" : "password"}
                                name="new_password"
                                autoComplete="current-password"
                                size="small"
                                autoFocus
                                {...register('newPassword')}
                                 className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`} 
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
                              <div className="invalid-feedback" style={{ color: "red" }}> {errors.newPassword?.message}</div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='password'
                                id="confirm_password"
                                placeholder='Confirm Password'
                                type={showPassword1 ? "text" : "password"}
                                name="confirm_password"
                                autoComplete="confirm-password"
                                size="small"
                                {...register('confirmPassword')} 
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword1}>
                                                {showPassword1 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                             <div className="invalid-feedback" style={{ color: "red" }}>{errors.confirmPassword?.message}</div>

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

export default CreatePassword;
