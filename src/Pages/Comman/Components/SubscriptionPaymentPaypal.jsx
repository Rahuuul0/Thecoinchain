import React, { useState,useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

 
const SubscriptionPaymentPaypal = () => {
 const [show, setShow] = useState(true);
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderDetails, setOrderDetails] = useState({});
 
 // creates a paypal order
 const createOrder = (data, actions) => {
   return actions.order
     .create({
       purchase_units: [
         {
           description: "Sunflower",
           amount: {
             currency_code: "USD",
             value: 20,
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
     setOrderDetails({...orderDetails,details});
     setSuccess(true);
   });
 };
 //capture likely error
 const onError = (data, actions) => {
   setErrorMessage("An Error occured with your payment ");
 };

 useEffect(() => {
  if (success) {
    console.log(orderDetails,'orderDetails')
    alert("Payment successful!!");
  }
},
[success]
);
 return (
   <PayPalScriptProvider
     options={{
       "client-id":"AUn5UCO_Au1_HCMn6jSIxPCddYANYpjC0UsojjJuBetSPMN0YpC2LP0SHpiH7ej3ld2Ws-giGgf6YooT",
     }}
   >   
    {show ? (
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    ) : null}     
   </PayPalScriptProvider>
 );
}

export default SubscriptionPaymentPaypal;


