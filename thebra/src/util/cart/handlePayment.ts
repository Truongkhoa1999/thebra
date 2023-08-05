import { CardElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";

export const handlePayment = async (
  stripe: Stripe | null,
  elements: StripeElements | null,
  totalAmountInCents: number,
  orderId:string | null
) => {
  if (!stripe || !elements) {
    throw new Error("Stripe or elements not available");
  }

  const cardElement = elements.getElement(CardElement);
  try {
    const { token } = await stripe.createToken(cardElement!);

    const response = await fetch("https://thebrabe.onrender.com/api/v1/stripe/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmountInCents,
        currency: "EUR",
        stripeToken: token?.id,
      }),
    });

    if (response.ok) {
      return "Payment successful";
      const updateOrderStatus = await fetch(`https://thebrabe.onrender.com/api/v1/order/${orderId}`)
    } else {
      throw new Error("Payment failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message)
    } else {
      console.log("An unknown error occurred.")
    }
  }
};
