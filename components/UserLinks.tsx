'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function UserLinks() {
  const { data, status } = useSession();

  return (
    <div>
      {status === 'authenticated' ? (
        <div className="flex items-center gap-4">
          <Link href="/orders">Orders</Link>
          <button className="uppercase" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
