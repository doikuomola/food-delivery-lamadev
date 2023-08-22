'use client';

import { Product } from '@/typings';
import { useCartStore } from '@/utils/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type PriceProp = {
  product: Product;
};

export default function Price({ product }: PriceProp) {
  const { price, options, id, title, img } = product;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCart = () => {
    addToCart({
      id: id,
      title: title,
      img: img,
      ...(product.options?.length && {
        optionsTitle: product?.options[selected]?.title,
      }),
      quantity: quantity,
      price: Number(total),
    });

    toast.success('The product has been added to the cart');
  };

  useEffect(() => {
    if (options?.length) {
      setTotal(quantity * price + options[selected]?.additionalPrice);
    }
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-8">
      {total && <h2 className="text-2xl font-bold">${total}</h2>}
      <div className="flex items-center gap-8 w-full">
        {options?.length
          ? options?.map((option, i) => (
              <button
                onClick={() => setSelected(i)}
                className="py-2 px-4 border border-red-500 rounded-md mt-4 transition-all duration-300 ease-in-out"
                style={{
                  background: selected === i ? 'rgb(248 113 113 )' : 'white',
                  color: selected === i ? 'white' : 'rgb(248 113 113)',
                }}
                key={i}
              >
                {option.title ? option.title : null}
              </button>
            ))
          : null}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between flex-grow pr-2 ring-1 ring-red-500 p-2">
          <span className="">Quantity</span>
          <div className="flex items-center gap-4 font-bold">
            <button
              className=""
              onClick={() =>
                setQuantity((prev) => (prev === 1 ? prev : prev - 1))
              }
            >
              &lt;
            </button>
            <span className="">{quantity}</span>
            <button
              className=""
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
        <button
          className="uppercase bg-red-500 text-white p-2 border border-red-500"
          onClick={handleCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
