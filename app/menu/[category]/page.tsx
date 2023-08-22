import { pizzas } from '@/constants';
import { Product } from '@/typings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CategoryProps = {
  params: { category: string };
};

async function getCategoryProducts(category: string) {
  const response = await fetch(
    `http:localhost:3000/api/products?cat=${category}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) throw new Error('get categories failed');

  return response.json();
}

export default async function Page({ params: { category } }: CategoryProps) {
  const categoryProducts = (await getCategoryProducts(category)) as Product[];

  console.log(categoryProducts)
  return (
    <main className="flex flex-wrap text-red-500">
      {categoryProducts.map((pizza: Product) => (
        <Link
          className="w-full h-[60vh] sm:w-1/2 lg:w-1/3 border-r-2 border-b-2 border-red-500 p-4 flex flex-col justify-around group odd:bg-fuchsia-50 "
          href={`/product/${pizza.id}`}
          key={pizza.id}
        >
          {pizza.img ? (
            <div className="relative h-[80%]">
              <Image
                fill
                src={pizza.img}
                alt="pizza-image"
                className="object-contain"
              />
            </div>
          ) : null}

          <div className="flex items-center justify-between font-bold ">
            <h1 className="text-xl uppercase p-2 ">{pizza.title}</h1>
            <h2 className="group-hover:hidden transition-all duration-300 ease-out">
              ${pizza.price}
            </h2>
            <button className="uppercase bg-red-500 text-white p-2 rounded-md hidden group-hover:block transition-all duration-300 ease-in-out">
              Add To Cart
            </button>
          </div>
        </Link>
      ))}
    </main>
  );
}
