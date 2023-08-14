import Link from 'next/link';
import React from 'react';
import Menu from './Menu';
import CartIcon from './CartIcon';
import Image from 'next/image';

export default function Navbar() {
  const user = {};

  return (
    <nav className="h-12 md:h-16 text-red-500 p-4 lg:px-20 xl:px-40 flex items-center justify-between border-b-2 border-red-500 uppercase">
      {/* left links */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/menu">Contact</Link>
      </div>
      {/* logo */}
      <div className="flex-1 md:text-center">
        <Link href="/" className="text-lg md:font-bold">
          Foodie
        </Link>
      </div>
      {/* mobile menu */}
      <div className="md:hidden ">
        <Menu />
      </div>
      {/* right links */}
      <div className="hidden md:flex gap-4 flex-1 justify-end">
        <div className="flex items-center gap-4 bg-orange-300 rounded-md px-1 cursor-pointer md:absolute lg:static top-3 right-2">
          <Image
            width={20}
            height={20}
            objectFit="cover"
            src={'/phone.png'}
            alt="phone"
          />
          <span>123 456 78</span>
        </div>
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
        <CartIcon />
      </div>
    </nav>
  );
}
