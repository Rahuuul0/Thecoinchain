import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Link, Breadcrumbs, Select, OutlinedInput, MenuItem, Switch, TextField } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions/user.actions"
import Sidebar from './Components/Sidebar';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
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
const Profile = () => {
    const profileUpdate = useUserActions();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    //yup validation
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required("Name is required"),
        email: Yup.string()
            .email()
            .trim()
            .required("Email Address is required"),
        mobile: Yup.string()
            .trim()
            .required("Mobile is required")
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
    const { errors, isSubmitting } = formState;


    const [personName, setPersonName] = React.useState([]);
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
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
        'Usa',
    ];
    const [value, setValue] = React.useState('1');

    const submitFunction = () => {
        profileUpdate.updateUser(localStorage.getItem("id"), formData)
    }
    const formData = watch();
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
                                                        <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} >Breanne Schinner</Typography>
                                                        <Typography component="p" variant='body2' className='secondary-color' sx={{ fontSize: '14px', color: '#777E90' }}>hello@coinguru.org</Typography>
                                                        <Button className='btn btn-outlined-secondary border-rounded' sx={{ color: '#58BD7D !important', marginTop: '30px', marginBottom: '20px', borderRadius: '90px !important' }}>VIP</Button>

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
                                        <Box sx={{ borderBottom: '1px solid #E6E8EC' }}>
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
                                            <Box className='' paddingY={0} >
                                                 <TextField
                                                 label="Name"
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
                                                    {...register("name")}
                                                />
                                                <div style={{ color: "red" }}>{errors.name?.message}</div>
                                            </Box>
                                            <Box className='input-bg' paddingY={0}>
                                                <TextField
                                                    label="Email"
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
                                                    backgroundColor='#fff'
                                                    autoComplete="off"
                                                    {...register("email")}
                                                />
                                                <div style={{ color: "red" }}>{errors.email?.message}</div>
                                            </Box>
                                            <Box className=''>
                                                <TextField
                                                  label="Mobile"
                                                    className="form-control white-input-box"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="mobile"
                                                    // placeholder='Mobile'
                                                    name="mobile"
                                                    autoComplete="off"
                                                    {...register("mobile")}
                                                />
                                                <div style={{ color: "red" }}>{errors.mobile?.message}</div>
                                            </Box>
                                        </Box>
                                        <Typography textAlign='right' paddingY={3}>
                                            <Button type="submit" className='btn btn-primary' sx={{ marginLeft: 'auto' }}>Save Settings</Button>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>

                </Box>
            </ThemeProvider>
        </>
    )
}

export default Profile
