'use client';

import { slideData } from '@/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)]">
      <div className="h-1/2 lg:h-full flex items-center justify-center flex-col gap-8 text-red-500 font-bold lg:w-1/2 bg-fuchsia-50">
        <h1 className="text-5xl md:text-6xl xl:text-7xl  uppercase p-4 md:p-10 text-center">
          {slideData[currentSlide].title}
        </h1>
        <button className="bg-red-500 text-white py-4 px-8 rounded">
          Order Now
        </button>
      </div>
      {/* image */}
      <div className="h-1/2 lg:h-full relative w-full lg:w-1/2">
        <Image
          className="object-cover"
          fill
          src={slideData[currentSlide].image}
          alt="slider_image"
        />
      </div>
    </section>
  );
}
