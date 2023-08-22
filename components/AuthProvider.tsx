'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthProviderType = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderType) {
  return <SessionProvider>{children}</SessionProvider>;
}
