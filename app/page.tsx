import { Featured, Offer, Slider } from '@/components';
import React from 'react';

export default function Page() {
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
    </main>
  );
}
