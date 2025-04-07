'use client';

import type { UseSessionOptions } from 'next-auth/react';
import { useSession } from 'next-auth/react';

// Extend the Session type to include custom properties
declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
  }
}

export const useClientSession = <R extends boolean = false>(
  options?: UseSessionOptions<R>,
) => {
  const { data: session, status, update } = useSession(options);

  const data = {
    ...session,
    access_token: session?.access_token,
    refresh_token: session?.refresh_token,
    id_token: session?.id_token,
  };

  return {
    session,
    status,
    update,
    data,
  };
};
