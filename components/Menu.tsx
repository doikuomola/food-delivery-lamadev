'use client';

import { links } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CartIcon from './CartIcon';
import { MenuLink } from '@/typings';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = {};

  return (
    <div>
      {isOpen ? (
        <Image
          width={20}
          height={20}
          objectFit="cover"
          src={'/close.png'}
          alt="menu"
          onClick={() => setIsOpen(false)}
          className="cursor-pointer"
        />
      ) : (
        <Image
          width={20}
          height={20}
          objectFit="cover"
          src={'/open.png'}
          alt="menu"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
      )}
      {isOpen ? (
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] w-screen flex flex-col gap-10 items-center justify-center text-3xl">
          {links.map((link: MenuLink) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          {!user ? (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setIsOpen(false)}>
              Orders
            </Link>
          )}

          <CartIcon setIsOpen={setIsOpen} />
        </div>
      ) : null}
    </div>
  );
}
