import Image from 'next/image';
import React from 'react';
import CountdownTimer from './Countdown';

export default function Offer() {
  return (
    <section className=" bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* text container */}
      <div className="flex-1 text-white flex flex-col items-center justify-center text-center p-6 gap-8">
        <h1 className="text-5xl xl:text-6xl font-bold">
          Delicious Burger & French Fry
        </h1>
        <p className="xl:text-xl text-gray-500">
          progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel
        </p>
        <span className="font-bold text-5xl text-yellow-300">
          <CountdownTimer />
        </span>
        <button className="bg-red-500 text-white rounded-md py-3 px-6">
          Order Now
        </button>
      </div>
      {/* image container */}
      <div className="flex-1 relative w-full md:h-full">
        <Image
          fill
          src={'/offerProduct.png'}
          alt="offer_image"
          className="object-contain"
        />
      </div>
    </section>
  );
}
