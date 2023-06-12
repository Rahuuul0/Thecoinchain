import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Button, Link, Breadcrumbs, Stack } from '@mui/material';
import SubsImage from '../../../public/assets/images/subs.svg';
import { NavigateNext } from '@mui/icons-material/';
import Sidebar from './Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import {  forecastSubAtom } from '../../_state';
import { useRecoilValue } from "recoil";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {subscriptionActions} from '../../_actions';

const plans = [
    {
        title: '7 days Plan',
        price: '$15 ',
        days: '7 days',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
        cta: 'You are subscribed to this plan.'
    },
    {
        title: '1 month Plan',
        price: '$40 ',
        days: '1 month',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
        cta: '-'
    },
    {
        title: '1 year Plan',
        price: '$250 ',
        days: '1 year',
        extra: 'Get all crypto price predictions & Trade with Machine Learning',
        cta: '-'
    }
]
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
const ForecastSubscriptions = () => {
    const navigate = useNavigate();
    const subscribed = subscriptionActions();
    const subscribedUser = useRecoilValue(forecastSubAtom);
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
    const [expanded, setExpanded] = React.useState(false);
    const handleChanges = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    // Subscription action get function   API data call 
    useEffect(()=>{
        const response = subscribed.subscribedUser()
        response.then((res)=>{(res)})
    },[])
  
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
                                <Sidebar />
                                <Box className='subscription-steps-col-details'>

                                    <Box className="step-one">
                                        <Box className="card-inner-head">
                                            <Typography component="h2" variant='h2'>
                                                <span>Forecast </span> Subscriptions
                                            </Typography>
                                            <Typography component="p" variant='body2' className='small-caption'>
                                                By pressing “unsubscribe”, you are immediately terminating the payments/access to the paid content. To regain full access to the content, a new subscription is required.
                                            </Typography>
                                        </Box>
                                        <Box className='subscription-plan'>
                                        <Accordion expanded={expanded === 'panel1'} onChange={handleChanges('panel1')}>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                             Plan Details
                                            </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            {plans.map((plan) => (
                                                <Box className="subscription-plan-card">
                                                    <Typography component="h4" variant='h4' className='plan-title'>
                                                        {plan.title}
                                                    </Typography>
                                                    <Box className="subscription-plan-body">
                                                        <Typography component="h4" variant='h4' className='plan-price'>
                                                            {plan.price} <span className='plan-days'>/ {plan.days}</span>
                                                        </Typography>

                                                        <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                                            {plan.extra}
                                                        </Typography>
                                                    </Box>
                                                    <Box className="subscription-plan-cta">
                                                        <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                                            {plan.cta}
                                                        </Typography>

                                                    </Box>
                                                </Box>
                                            ))}
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'panel2'} onChange={handleChanges('panel2')}>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                            >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Resubscribe</Typography>
                                            </AccordionSummary>
                                            <Box textAlign='center'>
                                        <img src={SubsImage} />
                                        <Typography variant='p' component='div' sx={{ color: '#777E90', fontSize: '14px' }}>Your subscription and recurring payment has been canceled.</Typography>
                                        <Stack className='subs-div' direction='row' spacing={3} paddingY={4} justifyContent='center'>
                                            <Button className='btn btn-outlined-secondary' >Home</Button>
                                            <Button onClick={() => { navigate("/subscription#"); }} className='btn btn-dark' >Resubscribe</Button>
                                        </Stack>
                                    </Box>
                                        </Accordion>
                    
                                        </Box>
                                        <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                            By pressing “unsubscribe”, you are immediately terminating the payments/access to the paid content once your plan finishes. To regain full access to the content, a new subscription is required.
                                        </Typography>
                                        <Box className="subscription-plan-cta">
                                            <Button onClick={() => { navigate("/"); }} variant='contained' className='btn btn-primary' sx={{ mt: 3, mx: 'auto' }}>Unsubscribed</Button>
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

export default ForecastSubscriptions
