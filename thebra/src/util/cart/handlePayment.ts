import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { CurrencyEnum } from "../../data/CurrencyEnum";

export const handlePayment = async (
  stripe: Stripe | null,
  elements: StripeElements | null,
  totalAmountInCents: number,
  // orderId: string | null
) => {
  if (!stripe || !elements) {
    return;
  }

  const cardElement = elements.getElement(CardElement);
  if (!cardElement) {
    return;
  }

  try {
    const { token } = await stripe.createToken(cardElement);
    const response = await fetch("https://thebrabe.onrender.com/api/v1/stripe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmountInCents,
        currency: "EUR",
        stripeToken: token?.id,
        // orderId: orderId,
      }),
    });

    if (response.ok) {
      console.log("Payment successful!");
    } else {
      // Handle payment failure
      console.log("Payment failed:", await response.text());
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message)
    } else {
      console.log("An unknown error occurred.")
    }
  }
};
