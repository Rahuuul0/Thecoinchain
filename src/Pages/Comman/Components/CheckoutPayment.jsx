import {useState,useMemo,useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement  
} from '@stripe/react-stripe-js';
import { Box, Container, Grid, Typography, Button, Modal, Link, TextField, FormControlLabel, Checkbox } from '@mui/material'
import {subscriptionActions} from './../../../_actions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BtcImg from '../../../../public/assets/images/icons/btc-ic.svg'
import WalletIc from '../../../../public/assets/images/icons/wallet.svg'
import VisaIc from '../../../../public/assets/images/icons/visa.svg'
import MasterIc from '../../../../public/assets/images/icons/master.svg'
import { Opacity } from '@mui/icons-material';

const stripePromise = loadStripe('pk_test_51NAt8fSGQOsMaWjbyOBmlRhFwSdDQt1wIWSMIyzzg16p9Qq2PjfKN1uS2UDP20EyvqxVIzECtgwU7erWue7zZQfm00LxmWF4sK');
const plans = [
  {
      title: '7 days Plan',
      price: '$15 ',
      days: '7 days',
      description: 'Get all crypto price predictions & Trade with Machine Learning',
  },
  {
      title: '1 month Plan',
      price: '$40 ',
      days: '1 month',
      description: 'Get all crypto price predictions & Trade with Machine Learning',
  },
  {
      title: '1 year Plan',
      price: '$250 ',
      days: '1 year',
      description: 'Get all crypto price predictions & Trade with Machine Learning',
  }
  ]


  const useOptions = () => {  
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize:"16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Roboto, Source Code Pro, monospace, SFUIDisplay",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                },

            }
        }),
        []
  );

  return options;
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const subscribed = subscriptionActions();    
  const [confirm, setConfirm] = useState({'plan':{},'step':1});
  const options = useOptions();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [payData, setpayData] = useState(0);

  // Subscription action get function   API data call 
  useEffect(()=>{
    const get_subscription = async() => {
      await subscribed.subscription()
      .then((res)=>{ setSubscriptionData(res) })
    }
    get_subscription();   
  },[])
  
  

  const handleSubmit = async (event) => {
    event.preventDefault() 

        // your billing details object looks like this
        const billingDetails = {
            name: "John",
            email: "john@example.com",
            address: {
                city: "New York",
                line1: "896 Bell Street",
                state: "New York",
                postal_code: "	10022"
            }
        }

        setProcessingTo(true);
        const cardElement = elements.getElement(CardNumberElement);

        try {
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
              setCheckoutError(paymentMethodReq.error.message);
              setProcessingTo(false);
              return;
            } 
            
            const resultToken = await stripe.createToken(cardElement);
              if (resultToken.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
              } 
                
              // pass the token to your backend API
            const data = await subscribed.createPaymentIntent({'sub_id':confirm.plan.id,'token':resultToken.token});              

            if (data.client_secret) {
              const confirmedCardPayment = await stripe.confirmCardPayment(data.client_secret, {
                  payment_method: paymentMethodReq.paymentMethod.id
              });

              if (confirmedCardPayment.error) {
                  setCheckoutError(confirmedCardPayment.error);
                  setProcessingTo(false);
                  return;
              }

              console.log(confirmedCardPayment,'confirmedCardPayment');

              // display your success messages or redirect user to a success page
              console.log("Payment successful")
              setProcessingTo(false)
            }else{
              console.log("Error: Server could not initiate the payment process.")
            }            
        } catch (err) {
            console.log(err.message)
            setCheckoutError(err.message)
        }
    
  }


  const handleCardDetailsChange = event => {
      event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };    

  const styled = (confirm.step===2)?{"height":'100%',"opacity":"1"}:{"height":'0px',"opacity":"0"}
  return (
    <form onSubmit={handleSubmit} >
        {confirm.step===1 &&

          <Box className="step-one">
              <Box className="card-inner-head">
                <Typography component="h5" variant='body1' className='large-caption'>
                Select Package
                </Typography>
              </Box>     
              <Box className='subscription-plan'>
                {subscriptionData.map((plan,i) => (
                    <Box className="subscription-plan-card">
                        <Typography component="h4" variant='h4' className='plan-title'>
                            {plan.subscription_name}
                        </Typography>
                        <Box className="subscription-plan-body">
                            <Typography component="h4" variant='h4' className='plan-price'>
                                {plan?.subscription_price||0}  <span className='plan-days'>/ {plan?.duration} days</span>
                            </Typography>
                            <Typography component="p" variant='body2' sx={{ fontSize: '14px' }}>
                                {plan.description}
                            </Typography>
                        </Box>
                        <Box className="subscription-plan-cta">
                            <Button variant='contained' className='btn btn-primary' sx={{ mx: 'auto' }} onClick={e=>setConfirm({plan,"step":2})} >Continue</Button>
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
        </Box>
       }
      
        {/* Step Two */}
       
        <Box className="step-two" style={styled}>       
          <Box className="card-inner-head">
            <Typography component="h5" variant='body1' className='large-caption'>
                <KeyboardBackspaceIcon /> Payment info
            </Typography>
            <Typography component="h5" variant='body1' className='large-caption invest-smarter'>
                Invest smarter, not harder. <img src={BtcImg} alt='BTC' width="24px" />
            </Typography>
          </Box>
        <Box className='payment-info'>           
            <Box  className='amount-for'>
                <Box className='payment-amount'>
                    <span className='wallet-ic'>
                        <img src={WalletIc} alt='wallet' width="20px" />
                    </span>
                    <Typography component="small" variant='body2'>
                      <span className='label'>Plan</span>
                      {confirm.plan.subscription_name}

                    </Typography>
                    <Typography component="small" variant='body2'>
                      <span className='label'>Amount</span>
                      {confirm.plan?.subscription_price||0}  
                    </Typography>
                </Box>               
            </Box>    
            <Box className='credit-card-head'>
                <Typography component="h5" variant='body1' className='large-caption' sx={{ fontWeight: '600' }}>
                    Credit Card
                </Typography>
                <Box className='card-type'>
                    <img src={VisaIc} alt='Visa' height="12px" />
                    <img src={MasterIc} alt='Master' height="12px" />
                </Box>
            </Box>
            <>
            <>{checkoutError}</>
            <label>
                <span>Card number</span>
                <CardNumberElement options={options} onChange={handleCardDetailsChange} />
            </label>
            <label>
                <span>Expiration date</span>

                <CardExpiryElement options={options} onChange={handleCardDetailsChange} />
            </label>
            <label>
                <span>CVC</span>
                <CardCvcElement options={options} onChange={handleCardDetailsChange} />
            </label>
            {/* {!checkoutError && <CheckoutError>{checkoutError}</CheckoutError>} */}
            <Box className="subscription-plan-cta">
                <Button variant='outlined' className='btn btn-outlined-secondary' onClick={e=>setConfirm({...confirm,step:1})}>Cancel</Button>
                <Button onClick={e=>setConfirm({...confirm,step:3})}  variant='contained' className='btn btn-primary' sx={{ ml: 'auto' }} >Continue</Button>
            </Box>     
          </>                                          
        </Box>
      </Box>

      {/* Step Three */}
      {confirm.step===3 &&
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
            <Box  className='amount-for'>
               <Box className='payment-amount'>
                    <span className='wallet-ic'>
                        <img src={WalletIc} alt='wallet' width="20px" />
                    </span>
                    <Typography component="small" variant='body2'>
                      <span className='label'>Plan</span>
                      {confirm.plan.subscription_name}

                    </Typography>
                    <Typography component="small" variant='body2'>
                      <span className='label'>Amount</span>
                      {confirm.plan?.subscription_price||0}  
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
            </Box>
            <Box className='credit-card-head'>
                <Typography component="p" variant='body1'>
                    You are about to Stay ahead of the crowd - with our predictive analysis of the crypto market!
                </Typography>
            </Box>
            <Box className='payment-breakdown'>
                <Box className='payment-breakdown-list'>
                    <Box className='payment-breakdown-list-itm'>
                        <Typography component="p" variant='body1'>                       
                          {confirm.plan?.subscription_price||0}  <span className='plan-days'>/ {confirm.plan?.duration} days plan</span>
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
                          0  USD
                        </Typography>
                    </Box>

                    <Box className='payment-breakdown-list-itm'>
                        <Typography component="p" variant='body1' sx={{ color: '#777E90', fontWeight: '400 !important' }}>
                          You will pay
                        </Typography>
                        <Typography component="p" variant='body1' sx={{ ml: "auto" }}>
                          {confirm.plan?.subscription_price||0}  USD
                        </Typography>
                    </Box>
                </Box>
                <Box className="subscription-plan-cta">
                    <Button variant='outlined' className='btn btn-outlined-secondary' onClick={e=>setConfirm({...confirm,step:2})}>Cancel</Button>
                    <Button variant='contained' className='btn btn-primary' sx={{ ml: 'auto' }} type='submit' disabled={!stripe || !elements} >I understand, Continue</Button>
                </Box>
            </Box>
          </Box>
        </Box>  
        }   
  </form>
  );
};


const CheckoutPayment = () => (
  <Elements stripe={stripePromise} >
    <CheckoutForm />
  </Elements>
);


export default CheckoutPayment;
