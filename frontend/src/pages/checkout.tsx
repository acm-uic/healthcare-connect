import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../hooks/useAuth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutForm = ({customerId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const { authenticated, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    
    // Call your backend to create a SetupIntent and get the clientSecret
    const { client_secret } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create-setup-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ customerId }), // Pass customerId
    }).then(res => res.json());

    console.log('Client Secret:', client_secret);

    const { error, setupIntent } = await stripe.confirmCardSetup(client_secret, { 
      // IntegrationError: Missing value for stripe.confirmCardSetup intent secret: value should be a client_secret string.
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
      // Handle error
    } else {
      console.log('Setup Intent:', setupIntent);
      // Now your customer has a payment method attached
      // You can call your backend to create a subscription for this customer
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

const StripeCheckout = ({ customerId }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm customerId={customerId} />
    </Elements>
  );
};

export default StripeCheckout;
