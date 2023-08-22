import { DeleteBtn, Price } from '@/components';
import { Product } from '@/typings';
import Image from 'next/image';
import React from 'react';

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error('Unable to fetch product');

  return res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = (await getProduct(id)) as Product;

  return (
    <main className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col md:flex-row items-center justify-around text-red-500 md:gap-8 md:items-center relative">
      {product.img ? (
        <div className="relative h-1/2 md:h-[70%] md:justify-center md:gap-8 md:items-center w-full">
          <Image
            fill
            src={product.img}
            alt="product-image"
            className="object-contain"
          />
        </div>
      ) : null}

      <div className="p-10 h-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold uppercase">{product.title}</h1>
        <p className="">{product.desc}</p>
        <Price product={product} />
      </div>

      <DeleteBtn id={product.id} />
    </main>
  );
}
