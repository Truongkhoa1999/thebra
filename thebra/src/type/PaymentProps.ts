import { Stripe } from "@stripe/stripe-js/types/stripe-js";

export interface PaymentProps {
    stripePromise: Promise<Stripe | null>;
  }

