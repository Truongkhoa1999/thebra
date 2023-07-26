import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './style/paymentform.scss'
import CreditCardIcon from '@mui/icons-material/CreditCard';


export const PaymentForm= () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    try {
      const response = await fetch('http://localhost:8080/api/v1/stripe/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: cardElement,
          amount: 1,
          currency: 'eur',
        }),
      });

      if (response.ok) {
        console.log('Payment successful!');
      } else {
        console.log('Payment failed:', await response.text());
      }
    } catch (error:any) {
      console.log('Error:', error.message);
    }
  }


  return (
    <div className="payment_form_container">
      <div>
        <h1>Payment</h1>
        <CreditCardIcon />
      </div>

      <CardElement className='card-elements' />
      <button onClick={handlePayment}>Pay EUR Now</button>
    </div>
  );
};
