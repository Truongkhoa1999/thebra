import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './style/paymentform.scss'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Preloader from '../loader/Preloader';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';


export const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const totalAmountInCents = Math.round(totalAmount*100)
  console.log(totalAmount)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get('orderId')


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/order/${orderId}`);
        if (response.ok) {
          const orderData = await response.json();
          setTotalAmount(orderData.totalAmount)
        } else {
          console.log('Failed to fetch order data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrder();
  }, []);

  const handlePayment = async () => {
    if (!stripe || !elements) {

      return (<Preloader />);
    }
    const cardElement = elements.getElement(CardElement);
    try {
      const { token } = await stripe.createToken(cardElement!);
      console.log(token)

      const response = await fetch('http://localhost:8080/api/v1/stripe/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmountInCents,
          currency: 'EUR',
          stripeToken: token?.id
        }),
      });

      if (response.ok) {
        console.log('Payment successful!');
      } else {
        console.log('Payment failed:', await response.text());
      }
    } catch (error: any) {
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
