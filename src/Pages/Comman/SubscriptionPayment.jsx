import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NAt8fSGQOsMaWjbyOBmlRhFwSdDQt1wIWSMIyzzg16p9Qq2PjfKN1uS2UDP20EyvqxVIzECtgwU7erWue7zZQfm00LxmWF4sK"
);
const SubscriptionPayment = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <>
      <Box
        component="main"
        className="extra-wrapper subscription-wrapper bredcrum-div"
        sx={{ mt: 8 }}
      >
        <Container maxWidth="lg">
          <Box className="subscription-wrapper-head">
            <Typography component="h2" variant="h2">
              Payment
            </Typography>
          </Box>

          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </Container>
      </Box>
    </>
  );
};

export default SubscriptionPayment;

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};
