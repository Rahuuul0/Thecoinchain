import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link, Breadcrumbs, Stack, Select, OutlinedInput, MenuItem, Switch, TextField } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import BtcImg from '../../../public/assets/images/icons/btc-ic.svg';
import FA from '../../../public/assets/images/fa.svg';
import Lockbtn from '../../../public/assets/images/lockbtn.svg';
import { KeyboardArrowRightIcon, NavigateNext } from '@mui/icons-material/';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const plans = [
    {
        title: '7 days Plan',
        price: '$15 ',
        days: '7 days',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    },
    {
        title: '1 month Plan',
        price: '$40 ',
        days: '1 month',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    },
    {
        title: '1 year Plan',
        price: '$250 ',
        days: '1 year',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
    }
]
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
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


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
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper' sx={{ mt: 8 }}>
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

                    <Box className='subscription-steps'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner'>
                                <Box className='subscription-steps-col'>
                                    <Stack spacing={2}>
                                        <Box sx={{ borderBottom: '1px solid #E6E8EC' }} paddingBottom={2}>
                                            <Typography className='left-icon secondary-color' paddingBottom={4} fontWeight={700}><span><img src={User} /> </span>Profile</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Share} /> </span>Referrals</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={2}><span><img src={Api} /> </span>API keys</Typography>
                                        </Box>
                                        <Box paddingTop={2}>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Session} /> </span>Sessions & login history</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={FA} /> </span>2FA</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Lockbtn} /> </span>Change password</Typography>
                                        </Box>

                                    </Stack>


                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className=''>
                                            <Grid container  >
                                                <Grid item xs={12} sm={8} md={8}>
                                                    <Box>
                                                        <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} >Breanne Schinner</Typography>
                                                        <Typography component="p" variant='body2' className='secondary-color' sx={{ fontSize: '14px', color: '#777E90' }}>hello@coinguru.org</Typography>
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
                                            <Button className='btn btn-outlined-secondary border-rounded' sx={{ color: '#58BD7D !important', marginTop: '30px', borderRadius: '90px !important' }}>VIP</Button>
                                        </Box>
                                        <Box sx={{ borderBottom: '1px solid #E6E8EC' }}>
                                            <Typography component="h5" variant='h5' className='' sx={{ fontWeight: '600' }} paddingY={5}  >Features</Typography>
                                        </Box>
                                        <Box>
                                            <Grid container paddingTop={5} paddingBottom={1}>
                                                <Grid item xs={12} sm={11} md={11}>
                                                    <Typography component="p" variant='body2' fontWeight={500} >VIP - Your annual plan will be expired on 15/2/2025</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={1} md={1}>
                                                    <Switch {...label} defaultChecked />
                                                </Grid>
                                            </Grid>
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
                                    <Box className="update-profile" sx={{ backgroundColor: '#F1F2F4', }} padding={5}>
                                        <Typography component="h5" variant='body1' className='large-caption'>
                                            Update your profile
                                        </Typography>
                                        <Box className='' paddingY={2}>
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
                                                // placeholder='Password'
                                                name="name"
                                                autoComplete="off"
                                            />

                                        </Box>
                                        <Box className=''>
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
                                                // placeholder='Email'
                                                name="email"
                                                autoComplete="off"
                                            // size="small"
                                            />

                                        </Box>
                                    </Box>
                                    <Typography textAlign='right' paddingY={3}>
                                        <Button className='btn btn-primary' sx={{ marginLeft: 'auto' }}>Save Settings</Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Container>
                    </Box>

                </Box >
            </ThemeProvider>
        </>
    )
}

export default Profile
