'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CartIconProp {
  setIsOpen?: any;
}

export default function CartIcon({ setIsOpen }: CartIconProp) {
  return (
    <Link
      href="/cart"
      className="flex items-center gap-4"
      onClick={() => setIsOpen(false)}
    >
      <div>
        <Image
          width={20}
          height={20}
          objectFit="cover"
          src={'/cart.png'}
          alt="cart-image"
        />
      </div>
      <p>
        cart
        <span>(3)</span>
      </p>
    </Link>
  );
}
