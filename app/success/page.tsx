'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type SuccessProps = {
  searchParams: { payment_intent: string };
};

export default function Success({
  searchParams: { payment_intent: intentId },
}: SuccessProps) {
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${intentId}`, {
          method: 'PUT',
        });

        router.push('/orders');
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, [router, intentId]);

  return (
    <div className="w-full py-20">
      <p className="text-center font-semibold">
        Payment successful. You are being redirected to the orders page. Please
        do not close the page!
      </p>
    </div>
  );
}
