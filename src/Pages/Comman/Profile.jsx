import React from 'react'
import { useRecoilState} from 'recoil';
import {useEffect,useState} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Link, Breadcrumbs, Select, OutlinedInput, MenuItem, Switch, TextField,InputAdornment } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions/user.actions"
import Sidebar from './Components/Sidebar';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from "@mui/material/IconButton";
import { MuiTelInput } from 'mui-tel-input'
import { authAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import {userAtom} from '../../_state/users';

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const Profile = (props) => {

const [Subscribe, setSubscribe] = useRecoilState(userAtom);
const navigate = useNavigate();
const profileUpdate = useUserActions();
const [phone, setPhone] = useState('')
const label = { inputProps: { "aria-label": "Switch demo" } };
const auth = useRecoilValue(authAtom);
const validationSchema = Yup.object().shape({
        user_name: Yup.string()
            .trim()
            .required("Name is required"),
        email: Yup.string()
            .email()
            .trim()
            .required("Email Address is required"),
        phone: Yup.string()
            .max(15,"Phone must be at most 15 characters")
            .trim()
            .required( "Mobile is required"),
           
        password: Yup.string()
            .required(" Password is required")
            .min(8, " Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            ),
        confirmpassword: Yup.string().required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const formData = watch();

     //password eye IconButton
     const [showPassword, setShowPassword] = React.useState(false);
     const [showPassword2, setShowPassword2] = React.useState(false);
 
     const handleClickShowPassword = () => setShowPassword((show) => !show);
     const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const [personName, setPersonName] = useState([]);

      // Mobile contry code 
      const handlePhone = (newPhone) => {
          setPhone(newPhone)
      }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Profile info
        </Typography>,
    ];
    const names = [
        'Australia',
        'Argentina',
        'Canada',
        'Belgium',
        'China',
        'India',
        'Ghana',
        'France',
        'Iraq',
        'USA',
    ];
    const [value, setValue] = useState('1');

    const submitFunction = () => {
        profileUpdate.updateUser({...formData,"name":formData.user_name})
        // profileUpdate.resetPassword({...formData,"name":formData.password})
        navigate("/")
    }

    useEffect(()=> {
        reset({...auth})
    },[auth])

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Profile info
                            </Typography>
                            <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                                <Box  >
                                    <Breadcrumbs
                                        separator={<NavigateNext fontSize="small" />}
                                        aria-label="breadcrumb"
                                        className='center-breadcrum'
                                    >
                                        {breadcrumbs}
                                    </Breadcrumbs>

                                </Box>
                            </Box>
                        </Box>
                    </Container>
                    <Box className='subscription-steps account-main'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner'>
                                <Sidebar />
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className=''>
                                            <Grid container  >
                                                <Grid item xs={12} sm={8} md={8} sx={{ paddingBottom: { xs: '20px', md: '5px' } }}>
                                                    <Box>
                                                        <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} >{auth.user_name?auth.user_name:auth.email.split('@')[0]}</Typography>
                                                        <Typography component="p" variant='body2' className='secondary-color' sx={{ fontSize: '14px', color: '#777E90' }}>{auth.email}</Typography>
                                                        <Button className='btn btn-outlined-secondary border-rounded' sx={{ color: '#58BD7D !important', marginTop: '30px', marginBottom: '20px', borderRadius: '90px !important' }}>{Subscribe?.isSubscribed?'VIP':'FREE' }</Button>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <Box>
                                                        <Select
                                                            multiple
                                                            displayEmpty
                                                            fullWidth
                                                            sx={{ backgroundColor: '#F4F5F6', borderRadius: '60px' }}
                                                            className='border-rounded'
                                                            value={personName}
                                                            onChange={handleChange}
                                                            input={<OutlinedInput />}
                                                            renderValue={(selected) => {
                                                                if (selected.length === 0) {
                                                                    return <p className='margin-0'>USA</p>;
                                                                }

                                                                return selected.join(', ');
                                                            }}
                                                            MenuProps={MenuProps}
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            <MenuItem disabled value="">
                                                                USA
                                                            </MenuItem>
                                                            {names.map((name) => (
                                                                <MenuItem
                                                                    key={name}
                                                                    value={name}
                                                                    style={getStyles(name, personName, theme)}
                                                                >
                                                                    {name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                       {Subscribe?.isSubscribed && <> <Box sx={{ borderBottom: '1px solid #E6E8EC' }}>
                                            <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} paddingY={5}  >Features</Typography>
                                        </Box>
                                        <Box>
                                            <Box display='flex' paddingY={3}>
                                                <span >
                                                    <Typography component="p" variant='body2' fontWeight={500} >VIP - Your annual plan will be expired on 15/2/2025</Typography>
                                                </span>
                                                <span >
                                                    <Switch {...label} defaultChecked />
                                                </span>
                                            </Box>
                                        </Box>
                                        <Typography component="p" variant='body2' paddingBottom={3} >
                                            Get all crypto price predictions
                                        </Typography>
                                        <Typography component="p" variant='body2' paddingBottom={3} >
                                            15 min, 1 hour, 4 hour, 1 day time frames available
                                        </Typography>
                                        <Typography component="p" variant='body2' paddingBottom={3} >
                                            Trade with Machine Learning
                                        </Typography>
                                        <Typography component="p" variant='body2' paddingBottom={3} >
                                            Stay informed, stay profitable
                                        </Typography>
                                      </> }
                                    </Box>

                                    <Box
                                        noValidate
                                        component="form"
                                        onSubmit={handleSubmit(submitFunction)}
                                    >
                                        <Box className="update-profile" sx={{ backgroundColor: '#F1F2F4', }} padding={5}>
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                Update your profile
                                            </Typography>
                                            <Box className='' paddingY={1} >
                                                <TextField
                                                     label="Name *"
                                                    className="form-control white-input-box"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="name"
                                                    name="name"
                                                    autoComplete="off"
                                                    backgroundColor='#fff'
                                                    autoFocus
                                                    {...register("user_name")}
                                                />
                                                <div className="invalid-feedback" style={{ color: "red" }}>{errors.user_name?.message}</div>
                                            </Box>
                                            <Box className='' paddingY={1}>
                                                <TextField
                                                    disabled
                                                    label="Email *"
                                                    className="form-control white-input-box"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    {...register("email")}
                                                />
                                                <div className="invalid-feedback" style={{ color: "red" }}>{errors.email?.message}</div>
                                            </Box>


                                            <Box className='' paddingY={1}>
                                                    <MuiTelInput
                                                    label="Mobile *"
                                                    className="form-control white-input-box"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="mobile"
                                                    autoComplete="off"
                                                    {...register("phone")}
                                                    value={phone}
                                                    onChange={handlePhone}
                                                />
                                                <div className="invalid-feedback" style={{ color: "red" }}>{errors.phone?.message}</div>
                                            </Box>  
                                       {auth.login_attempt !==0  && <><Box className='' paddingY={1}>
                                            <TextField
                                            required
                                            label="Password *"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin="normal"
                                            variant="standard"
                                            fullWidth
                                            id="password"
                                            placeholder='Password'
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            autoComplete="current-password"
                                            size="small"
                                            {...register('password')}
                                            className={`form-control white-input-box ${errors.password ? 'is-invalid' : ''}`}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword}>
                                                            {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <div className="invalid-feedback" style={{ color: "red" }}>{errors.password?.message}</div>
                                            </Box>   

                                            <Box className='' paddingY={1}>
                                            <TextField
                                              required
                                            label="Confirm Password *"
                                            margin="normal" 
                                            fullWidth
                                            id="confirm_password"
                                            placeholder='Confirm Password'
                                            type={showPassword2 ? "text" : "password"}
                                            name="confirm_password"
                                            autoComplete="confirm-password"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            {...register('confirmpassword')}
                                            className={`form-control white-input-box ${errors.confirmpassword ? 'is-invalid' : ''}`}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword2}>
                                                            {showPassword2 ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        
                                        />
                                        <div className="invalid-feedback" style={{ color: "red" }}>{errors.confirmpassword?.message}</div>
                                            </Box> 
                                            </>
                                       }
                                        </Box>
                                        <Typography textAlign='right' paddingY={3}>
                                            <Button    type="submit" className='btn btn-primary' sx={{ marginLeft: 'auto' }}>Save Settings</Button>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider> </>
);
  
};

export default Profile;
