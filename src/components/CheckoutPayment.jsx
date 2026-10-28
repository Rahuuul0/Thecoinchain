"use client";

import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { subscriptionActions } from "@/_actions";
import { planAtom, subplanAtom } from "@/_state";
import { Button, cn, LoadingOverlay, Modal } from "@/components/ui";
import SubscriptionPaymentPaypal from "./SubscriptionPaymentPaypal";

const stripePromise = loadStripe("pk_test_51NAt8fSGQOsMaWjbyOBmlRhFwSdDQt1wIWSMIyzzg16p9Qq2PjfKN1uS2UDP20EyvqxVIzECtgwU7erWue7zZQfm00LxmWF4sK");

const STRIPE_OPTIONS = {
  style: {
    base: { fontSize: "16px", color: "#424770", letterSpacing: "0.025em", fontFamily: "Roboto, Source Code Pro, monospace, SFUIDisplay", "::placeholder": { color: "#aab7c4" } },
    invalid: { color: "#9e2146" },
  },
};

// Placeholder billing details sent with the card (kept from the original flow).
const BILLING_DETAILS = {
  name: "John Smith",
  email: "john@example.com",
  address: { city: "New York", line1: "896 Bell Street", state: "NY", postal_code: "10022", country: "US" },
};

const btn = "px-[15px] py-2.5";

function Step({ number, label, state, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative z-[1] mb-10 flex cursor-pointer items-center gap-2.5 rounded-[48px] p-2 text-sm font-bold text-n4 hover:bg-[#f2f2f2] after:absolute after:top-[70px] after:left-[15px] after:-z-[1] after:w-6 after:rotate-90 after:border after:border-dashed after:border-n4 last:after:hidden dark:hover:bg-n2",
        state === "current" && "bg-page text-fg shadow-[0_4px_16px_-8px_rgba(15,15,15,0.1)]"
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full border-2 border-line font-display text-sm font-bold text-fg",
          state === "completed" && "border-success bg-success text-inverse",
          state === "current" && "border-success"
        )}
      >
        {state === "done" ? <Check className="size-[18px]" /> : number}
      </span>
      <p className="text-sm! font-bold text-inherit!">{label}</p>
    </div>
  );
}

function CardHead({ title, withTagline }) {
  return (
    <div className="flex items-center justify-between py-6 max-md:gap-5 max-md:py-8">
      <h5 className="flex items-center gap-2.5 text-2xl! font-semibold text-fg">{title}</h5>
      {withTagline && (
        <h5 className="flex items-center gap-2.5 text-base! font-medium text-fg max-md:text-right">
          Invest smarter, not harder. <img src="/assets/images/icons/btc-ic.svg" alt="BTC" width={24} />
        </h5>
      )}
    </div>
  );
}

function Summary({ plan, withMethod }) {
  const rows = [
    { label: "Amount", value: `$${plan?.subscription_price || 0}.00`, color: "bg-purple" },
    { label: "For", value: plan?.subscription_name, color: "bg-success" },
    ...(withMethod ? [{ label: "Method", value: "Credit Card", color: "bg-[#4bc9f0]" }] : []),
  ];
  return (
    <div className="my-12 flex justify-between rounded-2xl bg-n7 px-[37px] py-[25px] max-md:mt-0 max-md:flex-wrap max-md:gap-9 dark:bg-n2">
      {rows.map((row) => (
        <div key={row.label} className="flex gap-2.5 max-md:basis-full">
          <span className={cn("flex size-10 items-center justify-center rounded-full", row.color)}>
            <img src="/assets/images/icons/wallet.svg" alt="" width={20} />
          </span>
          <small className="text-sm font-medium">
            <span className="block font-normal text-n4">{row.label}</span>
            {row.value}
          </small>
        </div>
      ))}
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const subscriptionApi = subscriptionActions();
  const [plan] = useAtom(planAtom);
  const [subplan, setSubplan] = useAtom(subplanAtom);
  const [confirm, setConfirm] = useState({ plan: {}, step: 1 });
  const [plans, setPlans] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [open, setOpen] = useState(false);
  const [useCard, setUseCard] = useState(true);
  const [cardComplete, setCardComplete] = useState({ cardNumber: false, cardExpiry: false, cardCvc: false });

  useEffect(() => {
    // Arriving from "Renew" on the account page skips straight to payment.
    if (subplan === true) setConfirm({ plan, step: 2 });
    subscriptionApi.subscription().then((res) => {
      setPlans([...(res || [])].reverse());
      setSubplan(false);
    });
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const card = elements.getElement(CardNumberElement);
    try {
      const paymentMethodReq = await stripe.createPaymentMethod({ type: "card", card, billing_details: BILLING_DETAILS });
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessing(false);
        return;
      }
      const resultToken = await stripe.createToken(card);
      if (resultToken.error) {
        setCheckoutError(resultToken.error.message);
        setProcessing(false);
        return;
      }
      const data = await subscriptionApi.createPaymentIntent({ sub_id: confirm.plan.id, token: resultToken.token, paymentMethodReq });
      if (!data.client_secret) {
        console.log("Error: Server could not initiate the payment process.");
        return;
      }
      const confirmed = await stripe.confirmCardPayment(data.client_secret, { payment_method: paymentMethodReq.paymentMethod.id });
      if (confirmed.error) {
        setCheckoutError(confirmed.error.message);
        setProcessing(false);
        return;
      }
      setProcessing(false);
      setOpen(true);
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const onCardChange = (event) => {
    setCardComplete((c) => ({ ...c, [event.elementType]: event.complete }));
    setCheckoutError(event.error ? event.error.message : undefined);
  };

  const cardReady = cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc;
  const { step } = confirm;

  return (
    <div className="grid grid-cols-[220px_1fr] gap-[200px] max-[1025px]:gap-8 max-md:grid-cols-1">
      <LoadingOverlay open={processing} />

      <div className="max-md:hidden">
        <Step number={1} label={step === 1 ? "Select Package" : "Choose plan"} state={step === 1 ? "completed" : "done"} onClick={() => setConfirm({ ...confirm, step: 1 })} />
        <Step number={2} label="Payment info" state={step === 2 ? "current" : step === 3 ? "done" : undefined} onClick={() => setConfirm({ ...confirm, step: 2 })} />
        <Step number={3} label="Confirm order" state={step === 3 ? "current" : undefined} onClick={() => cardComplete.cardNumber && setConfirm({ ...confirm, step: 3 })} />
      </div>

      <div className="rounded-2xl bg-n8 p-10 shadow-[0_64px_64px_-48px_rgba(15,15,15,0.1)] max-[992px]:px-6 max-md:p-0 max-md:pb-10 dark:bg-ink">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <CardHead title="Select Package" />
              <div className="mb-9 border-t border-line">
                {plans.map((p) => (
                  <div key={p.id} className="mt-[22px] rounded border border-black/12 bg-white text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)] dark:bg-n3">
                    <h4 className="rounded-t-[3px] border-b border-black/12 bg-black/3 p-2 font-display font-bold text-fg max-md:text-2xl! max-md:font-semibold">{p?.subscription_name}</h4>
                    <div className="p-4">
                      <h4 className="mb-12 font-display font-bold text-fg">
                        ${p?.subscription_price || 0} <span className="font-sans text-2xl font-normal text-[#6c757d]">/ {p?.duration} days</span>
                      </h4>
                      <p className="text-sm!">{p.description}</p>
                    </div>
                    <div className="flex justify-center rounded-b-[3px] border-t border-black/12 bg-black/3 px-4 pt-[9px] pb-2">
                      <Button className={btn} onClick={() => setConfirm({ plan: p, step: 2 })}>
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs! text-[#6C757D]!">
                The subscription can be canceled at any moment through the payment system or by using the &quot;unsubscribe&quot; button in the Subscription section. In the case of technical issues, you can submit your inquiries
              </p>
              <p className="text-xs! text-[#6C757D]!">using the contact us form. By subscribing you accept our Disclaimer.</p>
              <p className="mt-8 text-xs! text-[#6C757D]!">
                Each account on our website can have only one active subscription at a time. Buying a new subscription while having an active one stops the active subscription. Each subscription requires its own user.
              </p>
            </div>
          )}

          {/* Step 2 stays mounted so the Stripe fields keep their state. */}
          <div className={step === 2 ? "" : "hidden"}>
            <CardHead title="Payment info" withTagline />
            <Summary plan={confirm.plan} />
            <div className="mb-5 flex gap-[15px]">
              <Button variant={useCard ? "primary" : "outlined"} className={btn} onClick={() => setUseCard(true)}>
                Credit Card
              </Button>
              <Button variant={useCard ? "outlined" : "primary"} className={btn} onClick={() => setUseCard(false)}>
                Paypal
              </Button>
            </div>

            {useCard && (
              <>
                <div className="flex">
                  <h5 className="text-2xl! font-semibold text-fg">Credit Card</h5>
                  <div className="ml-auto flex items-center gap-10">
                    <img src="/assets/images/icons/visa.svg" alt="Visa" height={12} />
                    <img src="/assets/images/icons/master.svg" alt="Master" height={12} />
                  </div>
                </div>
                <div className="mt-10 [&_.StripeElement]:rounded-xl [&_.StripeElement]:border-2 [&_.StripeElement]:border-line [&_.StripeElement]:px-4 [&_.StripeElement]:py-3 [&_.StripeElement--complete]:border-success [&_.StripeElement--focus]:border-primary [&_.StripeElement--invalid]:border-[#9e2146]">
                  {[
                    ["Card number", CardNumberElement],
                    ["Expiration date", CardExpiryElement],
                    ["CVC", CardCvcElement],
                  ].map(([label, Field]) => (
                    <label key={label} className="mt-8 block">
                      <span className="text-xs leading-3 font-bold text-n5 uppercase">{label}</span>
                      <Field options={STRIPE_OPTIONS} onChange={onCardChange} />
                    </label>
                  ))}
                  <div className="mt-2.5 text-xs text-[#9e2146]">{checkoutError}</div>
                  <div className="mt-12 flex max-[481px]:flex-wrap max-[481px]:gap-4">
                    <Button variant="outlined" className={cn(btn, "max-[481px]:w-full")} onClick={() => setConfirm({ ...confirm, step: 1 })}>
                      Cancel
                    </Button>
                    <Button disabled={!cardReady} variant={cardReady ? "primary" : "ghost"} className={cn(btn, "ml-auto max-[481px]:w-full")} onClick={() => setConfirm({ ...confirm, step: 3 })}>
                      Continue
                    </Button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && !useCard && <SubscriptionPaymentPaypal plan={confirm} setOpen={setOpen} setConfirm={setConfirm} />}
          </div>

          {step === 3 && (
            <div>
              <CardHead title="Confirm order" withTagline />
              <Summary plan={confirm.plan} withMethod />
              <p>You are about to Stay ahead of the crowd - with our predictive analysis of the crypto market!</p>
              <div className="mt-12">
                <div className="mb-3 flex justify-between font-medium">
                  <p>
                    ${confirm.plan?.subscription_price || 0} <span>/ {confirm.plan?.duration} days plan</span>
                  </p>
                  <p>USD</p>
                </div>
                <div className="my-2 h-px w-full bg-line" />
                <div className="mb-3 flex justify-between">
                  <p className="font-normal! text-n4!">Service fee</p>
                  <p className="font-medium">0 USD</p>
                </div>
                <div className="mb-3 flex justify-between">
                  <p className="font-normal! text-n4!">You will pay</p>
                  <p className="font-medium">${confirm.plan?.subscription_price || 0} USD</p>
                </div>
                <div className="mt-12 flex max-[481px]:flex-wrap max-[481px]:gap-4">
                  <Button variant="outlined" className={cn(btn, "max-[481px]:w-full")} onClick={() => setConfirm({ ...confirm, step: 2 })}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!stripe || !elements} className={cn(btn, "ml-auto max-[481px]:w-full")}>
                    I understand, Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="xs">
        <div className="mt-4 p-4 text-center">
          <h2 className="mb-8 font-display text-5xl font-bold">Yay! 🎉</h2>
          <p className="font-medium">
            You successfully subscribed.
            <br />
            Crypto prediction made easy - our algorithms do the work for you!
          </p>
        </div>
        <div className="flex justify-between gap-5 max-[481px]:flex-wrap">
          <Button variant="outlined" fullWidth href="/" className={btn}>
            Home
          </Button>
          <Button fullWidth href="/account" className={btn}>
            Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default function CheckoutPayment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
