import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="h-12 md:h-16 p-4 lg:px-20 xl:px-40 flex items-center">
      <Link href="/" className="flex-grow">
        <span className="font-bold text-lg">Foodie</span>
      </Link>
      <p className="text-red-500 text-sm font-semibold">All rights reserved.</p>
    </footer>
  );
}
