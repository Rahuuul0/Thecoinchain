import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField, Typography, Link, Button, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { EmailOutlined , PersonOutlineOutlined, LockOutlined} from '@mui/icons-material';

const theme = createTheme();

const CreateAccount = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("User Name is required"),
        email: Yup.string()
            .email()
            .trim()
            .required("Email Address is required"),
        password: Yup.string()
            .trim()
            .required("Password is required"),
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
                    <Box
                        className='auth-wrapper-inner'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h3" variant="h3">
                            Create Account
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Welcome! enter your details and start Getting Rich!
                        </Typography>
                        <Box
                            noValidate
                            component="form"
                            sx={{ mt: '24px' }}
                            onSubmit={handleSubmit(userActions.create)}
                        >
                            <TextField
                             onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                margin="normal"
                                required
                                fullWidth
                                type='text'
                                id="username"
                                // label="Email Address"
                                placeholder='Username'
                                name="username"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonOutlineOutlined />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
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
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailOutlined />
                                      </InputAdornment>
                                    ), 
                                  }}
                                
                            />
                            <div style={{ color: "red" }}>{errors.email?.message}
                            </div>
                            <TextField
                             onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                margin="normal"
                                required
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                id="password"
                                // label="Password"
                                placeholder='Password'
                                name="password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined />
                                      </InputAdornment>
                                    ), 
                                  }}
                            />
                            <TextField
                             onChange={(e) => reset({ ...formData, name: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                                margin="normal"
                                required
                                type={showCnfrmPassword ? "text" : "password"}
                                fullWidth
                                id="confirm_password"
                                // label="Password"
                                placeholder='Confirm Password'
                                name="confirm_password"
                                autoComplete="off"
                                size="small"
                                autoFocus
                                className="form-control"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutlined />
                                      </InputAdornment>
                                    ), 
                                  }}
                            />
                             <div style={{ color: "red" }}> {errors.confirm_password?.message}
                            </div>
                            <Button type="submit" disabled={isSubmitting} variant="contained" className='btn btn-primary'>
                                Create account
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default CreateAccount
