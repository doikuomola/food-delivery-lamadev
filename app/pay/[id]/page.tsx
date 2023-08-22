'use client';

import { CheckoutForm } from '@/components';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Pay({ params }: { params: { id: string } }) {
  const { id: orderId } = params;

  const [clientSecret, setClientSecret] = React.useState('');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${orderId}`,
          {
            method: 'POST',
          }
        );

        const data = await res.json();

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [orderId]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
