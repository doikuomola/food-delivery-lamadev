import React from 'react';

export default function Notification() {
  return (
    <div className="h-12 bg-red-500 text-white px-4 flex items-center justify-center">
      <p className="text-center text-sm md:text-base cursor-pointer">
        Free delivery for all orders over ₦500. Order your food now!
      </p>
    </div>
  );
}
