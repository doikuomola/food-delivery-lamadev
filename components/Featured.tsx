import { featuredProducts } from '@/constants';
import Image from 'next/image';
import React from 'react';

export default function Featured() {
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* wrapper */}
      <div className="w-max flex py-4">
        {/* single item */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[32vw] xl:h-[90vh]"
          >
            {/* image container */}
              {item.img ? (
            <div className="relative w-full flex-1 hover:rotate-[60deg] transition-all duration-500">
                <Image
                  fill
                  src={item.img}
                  alt="featured_image"
                  className="object-contain"
                />
            </div>
              ) : null}
            {/* text container */}
            <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
              <h1 className="text-xl uppercase font-bold xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
