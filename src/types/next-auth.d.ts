/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
  }

  interface JWT {
    access_token?: string;
  }
}
