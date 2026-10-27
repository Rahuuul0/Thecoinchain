"use client";

import React, { useState,useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {subscriptionActions} from '@/_actions';

 
const SubscriptionPaymentPaypal = ({plan,setOpen,setConfirm}) => {
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderDetails, setOrderDetails] = useState({});
 const subscriptionApi = subscriptionActions();    

 // creates a paypal order


 const createOrder = (data, actions) => {
   return actions.order
     .create({
       purchase_units: [
         {
           description: `${plan.plan.subscription_name}`,
           amount: {
             currency_code: "USD",
             value: parseFloat(plan.plan.subscription_price),
           },
         },
       ],
       // not needed if a shipping address is actually needed
       application_context: {
         shipping_preference: "NO_SHIPPING",
       },
     })
     .then((orderID) => {
      setOrderDetails({...orderDetails,orderID});
      return orderID;
     });
 };
 
 // check Approval
 const onApprove = (data, actions) => {
   return actions.order.capture().then(function (details) {
     const { payer } = details;
     setOrderDetails({...orderDetails,...details});
     setSuccess(true);     
   });
 };
 //capture likely error
 const onError = (data, actions) => {
   setErrorMessage("An Error occured with your payment");
 };

 useEffect(() => {
  const get_subscription = async() => {
    const data = await subscriptionApi.createPaymentIntentPaypal({
      'sub_id':plan.plan.id,
      'token':orderDetails.payer.payer_id,
      'transaction_id':orderDetails.id,
      'orderDetails':orderDetails
    });     
    setConfirm({...plan,step:3});          
    setOpen(true);         
  }   
  if (success) {    
    console.log(orderDetails,'Payment successful!!') 
    get_subscription();
  }  
},
[success]
);

 return (
   <PayPalScriptProvider
     options={{
       clientId: "AUn5UCO_Au1_HCMn6jSIxPCddYANYpjC0UsojjJuBetSPMN0YpC2LP0SHpiH7ej3ld2Ws-giGgf6YooT",
     }}
   >      
    <PayPalButtons      
      style={{ layout: "vertical" }}
      createOrder={createOrder}
      onApprove={onApprove}
      //onClick={setConfirm({...plan,step:3})}
    />      
   </PayPalScriptProvider>
 );
}

export default SubscriptionPaymentPaypal;


