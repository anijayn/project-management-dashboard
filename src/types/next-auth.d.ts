// This file is not needed for the project, but it is here to help with type safety when using NextAuth.js
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    }
  }
} 