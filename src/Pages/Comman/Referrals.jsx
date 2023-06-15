import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Link, Breadcrumbs, InputAdornment, TextField, } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { useNavigate } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import {authAtom } from '../../_state/'
import { useRecoilValue } from "recoil";

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
const Referrals = () => {
    const userReferrals = useRecoilValue(authAtom);
    const navigate = useNavigate();
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
            Referrals
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
                                Referrals
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

                                    <Box className="main-box" >
                                        <Box className="inner-box">
                                            <Typography component="h6" variant="h6" className="body-caption" paddingBottom={1}>
                                                Total rewards
                                            </Typography>
                                            <Typography component="h3" variant="h3" className="secondary-font green-span" fontWeight={700} paddingBottom={2}>
                                              {userReferrals.total_earning === null ? '0,00.00' : userReferrals?.total_earning }  <span className='green-color' >USD</span>
                                            </Typography>
                                            <Typography component="p" variant="p" className="secondary-color small-caption " paddingBottom={3}  >
                                                You're earning 20% of the subscription plan your<br />
                                                referrals pay. Learn more
                                            </Typography>
                                            <Box className="center-box refferal-form" padding={3} marginY={2} sx={{ backgroundColor: '#F1F2F4', borderRadius: '10px' }}>
                                                <Typography component="h6" variant="h6" paddingBottom={0} fontWeight={600} className="body-large mobile-body-large">
                                                    Invite friends to earn 20%
                                                </Typography>
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="REFERRAL LINK"
                                                            className="black-label form-control white-input-box"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="standard"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="link"
                                                            // placeholder='link'
                                                            name="link"
                                                            autoComplete="off"
                                                        // size="small"
                                                        />

                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="REFERRAL CODE"
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">Copied</InputAdornment>,
                                                            }}
                                                            className="black-label form-control white-input-box copied-adorement"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="standard"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="code"
                                                            // placeholder='Link'
                                                            name="code"
                                                            autoComplete="off"

                                                        // size="small"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Button onClick={() => { navigate('/') }}  
                                            variant="outlined" 
                                            sx={{ marginY: '30px' }} 
                                            className="referrals-btn btn btn-outlined-secondary">
                                                My dashboard
                                            </Button>
                                        </Box>
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

export default Referrals
