import React, { useState ,useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal, Link, TextField, FormControlLabel, Checkbox } from '@mui/material'
import CryptoTrader01 from '../../../public/assets/images/crypto-trader-01.svg'
import CryptoTrader02 from '../../../public/assets/images/crypto-trader-02.svg'
import CryptoTrader03 from '../../../public/assets/images/crypto-trader-03.svg'
import BtcImg from '../../../public/assets/images/icons/btc-ic.svg'
import WalletIc from '../../../public/assets/images/icons/wallet.svg'
import VisaIc from '../../../public/assets/images/icons/visa.svg'
import MasterIc from '../../../public/assets/images/icons/master.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import {subscriptionActions} from '../../_actions/subscription.actions';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



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

const Subscription = () => {
    const navigate = useNavigate();
    const subscribed = subscriptionActions()    
    const [open, setOpen] = useState(false);
    const [payData, setpayData] = useState(0);
    const [subscriptionData, setSubscriptionData] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Subscription action get function   API data call 
    useEffect(()=>{
       const    response = subscribed.subscription()
       response.then((res)=>{setSubscriptionData(res)})
    },[])
 
    //  Accordion  function call
    const [expandFirst, setExpandFirst] = React.useState(true);
    const [expand, setExpand] = React.useState(false);
    const [confirm, setconfirm] = React.useState(false);
    const toggleAcordion = () => {
      setExpand((prev) => true);
      setExpandFirst((prev) => false);
    };
    const confirmAcordion = () => {
      setExpand((prev) => false);
      setconfirm((prev) => true);
      };
        
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='subscription-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                                Subscriptions
                            </Typography>

                            <Typography component="small" variant='body2' className='' sx={{ color: '#777E90', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                How to buy crypto on Bitcloud <Link sx={{ color: '#353945', display: 'flex', alignItems: 'center' }}>Learn now <KeyboardArrowRightIcon sx={{ width: '16px' }} /></Link>
                            </Typography>
                        </Box>
                    </Container>

                    <Box className='subscription-steps'>
                        <Container maxWidth="lg">
                            <Box className='subscription-steps-inner'>
                                <Box className='subscription-steps-col'>
                                    <Box className='subscription-step completed-step'>
                                       
                                        <Box component="span" className='number-circle'>
                                        <Button >1</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Select Package
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step current-step'>
                                        <Box component="span" className='number-circle'>
                                        <Button onClick={() =>{toggleAcordion()}}>2</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Payment info
                                        </Typography>
                                    </Box>
                                    <Box className='subscription-step'>
                                        <Box component="span" className='number-circle'>
                                        <Button onClick={confirmAcordion}>3</Button>
                                        </Box>
                                        <Typography component="p" variant='body2'>
                                            Confirm order
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className='subscription-steps-col-details'>
                                    <Box className="step-one">
                                        <Box className="card-inner-head">
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                Select Package
                                            </Typography>
                                        </Box>

                                       {expandFirst&& <Accordion  expanded={expandFirst}>
                                            <AccordionSummary>
                                            <Typography>Plan Details</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography>
            
                                                `<Box className='subscription-plan'>
                                                    {plans.map((plan,i) => (
                                                        <Box className="subscription-plan-card">
                                                            <Typography component="h4" variant='h4' className='plan-title'>
                                                                {plan.title}
                                                            </Typography>
                                                            <Box className="subscription-plan-body">
                                                                <Typography component="h4" variant='h4' className='plan-price'>
                                                                    {subscriptionData[subscriptionData.length-(i+1)]?.subscription_price}  <span className='plan-days'>/ {subscriptionData[subscriptionData.length-(i+1)]?.duration} days</span>
                                                                </Typography>

                                                                <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                                                    {plan.extra}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="subscription-plan-cta">
                                                                <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }} onClick={()=>{setpayData(subscriptionData.length-(i+1));toggleAcordion()}} >Continue</Button>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                                <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                                    The subscription can be canceled at any moment through the payment system or by using the "unsubscribe" button in the Subscription section. In the case of technical issues, you can submit your inquiries
                                                </Typography>
                                                <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D' }}>
                                                    using the contact us form. By subscribing you accept our Disclaimer.
                                                </Typography>
                                                <Typography component="p" variant='body2' className='small-caption' sx={{ color: '#6C757D', mt: '32px' }}>
                                                    Each account on our website can have only one active subscription at a time. Buying a new subscription while having an active one stops the active subscription. Each subscription requires its own user.
                                                </Typography>

                                            </Typography>
                                            </AccordionDetails>
                                        </Accordion>}
                                                                
                                    </Box>
                                   {expand&& <Accordion expanded={expand}>
                                        <AccordionSummary>
                                        <Typography>Payment info</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>

                                        <Box className="step-two">
                                        <Box className="card-inner-head">
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                <KeyboardBackspaceIcon /> Payment info
                                            </Typography>
                                            <Typography component="h5" variant='body1' className='large-caption invest-smarter'>
                                                Invest smarter, not harder. <img src={BtcImg} alt='BTC' width="24px" />
                                            </Typography>

                                        </Box>
                                        <Box className='payment-info'>
                                            {subscriptionData.map((item,i)=>{
                                                return(<>
                                            {payData==i? <Box  className='amount-for'>
                                                <Box className='payment-amount'>
                                                    <span className='wallet-ic'>
                                                        <img src={WalletIc} alt='wallet' width="20px" />
                                                    </span>
                                                    <Typography component="small" variant='body2'>
                                                        <span className='label'>Amount</span>
                                                       {item.subscription_price}
                                                    </Typography>
                                                </Box>
                                                <Box className='payment-for'>
                                                    <span className='wallet-ic'>
                                                        <img src={WalletIc} alt='wallet' width="20px" />
                                                    </span>
                                                    <Typography component="small" variant='body2'>
                                                        <span className='label'>Amount</span>
                                                        {item.subscription_price}
                                                    </Typography>
                                                </Box>
                                            </Box>:""}
                                                </>)

                                            } ) }
                                          

                                            <Box className='credit-card-head'>
                                                <Typography component="h5" variant='body1' className='large-caption' sx={{ fontWeight: '600' }}>
                                                    Credit Card
                                                </Typography>
                                                <Box className='card-type'>
                                                    <img src={VisaIc} alt='Visa' height="12px" />
                                                    <img src={MasterIc} alt='Master' height="12px" />
                                                </Box>
                                            </Box>
                                            <Box className='payment-form'>
                                                <TextField
                                                    label="Card Number"
                                                    className="form-control"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="card_number"
                                                    placeholder='xxxx xxxx xxxx 1234'
                                                    name="text"
                                                    autoComplete="off"
                                                    size="small"
                                                />
                                                <TextField
                                                    label="Card Holder"
                                                    className="form-control"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="card_holder"
                                                    placeholder='Patrick Nova'
                                                    name="text"
                                                    autoComplete="off"
                                                    size="small"
                                                />
                                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }} rowSpacing={1} sx={{ flexGrow: 2 }}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="EXPIRATION DATE"
                                                            className="form-control"
                                                            type="text"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="standard"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="expiry_date"
                                                            placeholder='MM/YY'
                                                            name="text"
                                                            autoComplete="off"
                                                            size="small"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="CSV"
                                                            className="form-control"
                                                            type="text"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="standard"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="expiry_date"
                                                            placeholder=''
                                                            name="text"
                                                            autoComplete="off"
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <FormControlLabel className='save-card' control={<Checkbox defaultChecked />} label="Save Card" />
                                                <Box className="subscription-plan-cta">
                                                    <Button variant='contained' className='btn btn-primary' sx={{ ml: 'auto' }} onClick={confirmAcordion}>Continue</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                        </Box>
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>}

                                    {confirm &&<Accordion expanded={confirm} >
                                        <AccordionSummary>
                                        <Typography>Confirm order</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                        <Box className="step-three">
                                        <Box className="card-inner-head">
                                            <Typography component="h5" variant='body1' className='large-caption'>
                                                <KeyboardBackspaceIcon /> Confirm order
                                            </Typography>
                                            <Typography component="h5" variant='body1' className='large-caption invest-smarter'>
                                                Invest smarter, not harder. <img src={BtcImg} alt='BTC' width="24px" />
                                            </Typography>

                                        </Box>
                                        <Box className='payment-info'>
                                            {subscriptionData.map((item,i)=>{
                                                return(<>
                                            {payData==i? <Box  className='amount-for'>
                                                <Box className='payment-amount'>
                                                    <span className='wallet-ic'>
                                                        <img src={WalletIc} alt='wallet' width="20px" />
                                                    </span>
                                                    <Typography component="small" variant='body2'>
                                                        <span className='label'>Amount</span>
                                                       {item.subscription_price}
                                                    </Typography>
                                                </Box>
                                                <Box className='payment-for'>
                                                    <span className='wallet-ic'>
                                                        <img src={WalletIc} alt='wallet' width="20px" />
                                                    </span>
                                                    <Typography component="small" variant='body2'>
                                                        <span className='label'>Amount</span>
                                                        {item.subscription_price}
                                                    </Typography>
                                                </Box>
                                                <Box className='payment-method'>
                                                    <span className='wallet-ic'>
                                                        <img src={WalletIc} alt='wallet' width="20px" />
                                                    </span>
                                                    <Typography component="small" variant='body2'>
                                                        <span className='label'>Method</span>
                                                        Credit Card
                                                    </Typography>
                                                </Box>
                                            </Box>:""}
                                                </>)

                                            } ) }
                                            <Box className='credit-card-head'>
                                                <Typography component="p" variant='body1'>
                                                    You are about to Stay ahead of the crowd - with our predictive analysis of the crypto market!
                                                </Typography>
                                            </Box>
                                            <Box className='payment-breakdown'>
                                                <Box className='payment-breakdown-list'>
                                                    <Box className='payment-breakdown-list-itm'>
                                                        <Typography component="p" variant='body1'>
                                                            $15.00 - 7 days plan
                                                        </Typography>
                                                        <Typography component="p" variant='body1' sx={{ ml: "auto" }}>
                                                            USD
                                                        </Typography>
                                                    </Box>

                                                    <Box className='devider' sx={{ my: 1, borderColor: '#E6E8EC' }} />
                                                    <Box className='payment-breakdown-list-itm'>
                                                        <Typography component="p" variant='body1' sx={{ color: '#777E90', fontWeight: '400 !important' }}>
                                                            Service fee
                                                        </Typography>
                                                        <Typography component="p" variant='body1' sx={{ ml: "auto" }}>
                                                            USD
                                                        </Typography>
                                                    </Box>

                                                    <Box className='payment-breakdown-list-itm'>
                                                        <Typography component="p" variant='body1' sx={{ color: '#777E90', fontWeight: '400 !important' }}>
                                                            You will pay
                                                        </Typography>
                                                        <Typography component="p" variant='body1' sx={{ ml: "auto" }}>
                                                            USD
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box className="subscription-plan-cta">
                                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Cancel</Button>
                                                    <Button variant='contained' className='btn btn-primary' sx={{ ml: 'auto' }} onClick={handleOpen}>I understand, Continue</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                        </Box>
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>}
                                  
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                    <Box className='become-a-crypto-trader'>
                        <Container maxWidth="lg">
                            <Box className='crypto-trader-head'>
                                <Typography component="h2" variant='h2'>
                                    Become a crypto trader in seconds
                                </Typography>
                                <Typography component="p" variant='body1' sx={{ color: '#777E90' }}>
                                    We've got everything you need to start trading.
                                </Typography>
                            </Box>
                            <Box className='become-a-crypto-trader-cards'>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader01} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Buy & Sell Crypto
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Buy crypto</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader02} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Trade Assets
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Trade now</Button>
                                </Box>
                                <Box className='become-a-crypto-trader-card'>
                                    <Box className='crypto-trader-img'>
                                        <img src={CryptoTrader03} alt='Crypto Trader' />
                                    </Box>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '500' }}>
                                        Earn Rewards for Trading
                                    </Typography>
                                    <Typography component="p" variant='body2' className='body-caption' sx={{ color: '#777E90', my: 2 }}>
                                        We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                                    </Typography>

                                    <Button variant='outlined' className='btn btn-outlined-secondary'>Learn now</Button>
                                </Box>
                            </Box>
                            <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }} onClick={() => { navigate("./contact") }}>Contact Us</Button>
                        </Container>
                    </Box>
                </Box >
            </ThemeProvider >
            {/* Modal */}
            < Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box className="modal-dialog modal-subscribed">
                    <Button onClick={handleClose} variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><CloseIcon /></Button>

                    <Box className="modal-modal-description" sx={{ mt: 2, p: 2 }}>
                        <Typography className="modal-modal-title" variant="h2" component="h2">
                            Yay! 🎉
                        </Typography>
                        <Typography className="crypto-fullname" variant="body1" component="p">
                            You successfully subscribed.<br />
                            Crypto prediction made easy - our algorithms do the work for you!
                        </Typography>

                    </Box>
                    <Box className="modal-subscribed-cta">
                        <Button
                            fullWidth
                            variant="outlined"
                            className='btn btn-outlined-secondary'
                            onClick={()=>{
                                navigate("/")
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            className='btn btn-primary'
                            onClick={()=>{
                                navigate("/prediction-dashboard")
                            }}
                        >
                            Dashboard
                        </Button>
                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default Subscription
