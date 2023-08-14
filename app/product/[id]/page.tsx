import { Price } from '@/components';
import { singleProduct } from '@/constants';
import Image from 'next/image';
import React from 'react';

export default function Page() {
  return (
    <main className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col md:flex-row items-center justify-around text-red-500 md:gap-8 md:items-center">
      {singleProduct.img ? (
        <div className="relative h-1/2 md:h-[70%] md:justify-center md:gap-8 md:items-center w-full">
          <Image
            fill
            src={singleProduct.img}
            alt="product-image"
            className="object-contain"
          />
        </div>
      ) : null}

      <div className="p-10 h-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold uppercase">{singleProduct.title}</h1>
        <p className="">{singleProduct.desc}</p>
        <Price
          price={singleProduct.price}
          id={singleProduct.id}
          options={singleProduct.options}
        />
      </div>
    </main>
  );
}
