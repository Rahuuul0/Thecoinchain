import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link, Breadcrumbs, Stack, Select, OutlinedInput, MenuItem, Switch, TextField } from '@mui/material';
import User from '../../../public/assets/images/user.svg';
import Share from '../../../public/assets/images/share-square.svg';
import Session from '../../../public/assets/images/session.svg';
import Api from '../../../public/assets/images/api.svg';
import SubsImage from '../../../public/assets/images/subs.svg';
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
const SubsPage = () => {
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
            Subscriptions
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
                <Box component="main" className='subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                            Subscriptions
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
                                <Box className='subscription-steps-col'>
                                    <Stack spacing={2}>
                                        <Box sx={{ borderBottom: '1px solid #E6E8EC' }}>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={User} /> </span>Profile</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Share} /> </span>Referrals</Typography>
                                            <Typography className='left-icon' fontWeight={700} paddingBottom={2}><span><img src={Api} /> </span>Subscriptions</Typography>
                                        </Box>
                                        <Box>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Session} /> </span>Sessions & login history</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={FA} /> </span>2FA</Typography>
                                            <Typography className='left-icon secondary-color' paddingBottom={4}><span><img src={Lockbtn} /> </span>Change password</Typography>
                                        </Box>

                                    </Stack>


                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box textAlign='center'>
                                        <img src={SubsImage} />
                                        <Typography variant='p' component='div' sx={{ color: '#777E90', fontSize: '14px' }}>Your subscription and recurring payment has been canceled.</Typography>
                                        <Stack className='subs-div' direction='row' spacing={3}paddingY={4} justifyContent='center'>
                                            <Button className='btn btn-outlined-secondary' >Home</Button> 
                                            <Button className='btn btn-dark' >Resubscribe</Button>
                                        </Stack>
                                    </Box>



                                </Box>
                            </Box>
                        </Container>
                    </Box>

                </Box >
            </ThemeProvider>
        </>
    )
}

export default SubsPage
