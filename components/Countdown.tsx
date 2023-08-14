'use client';

import React from 'react';
import Countdown from 'react-countdown';

export default function CountdownTimer() {
  const endingDate = new Date('2023-08-12');

  return <Countdown date={endingDate} />;
}
