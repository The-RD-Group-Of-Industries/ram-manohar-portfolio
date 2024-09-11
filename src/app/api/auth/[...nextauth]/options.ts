/**
 * Configures the NextAuth.js authentication options for the application.
 * 
 * This configuration includes:
 * - Credentials provider for email and password authentication
 * - Callbacks for handling JWT token and session data
 * - Session strategy set to JWT
 * - NextAuth secret from environment variable
 * - Sign-in page set to '/sign-in'
 */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/resourse';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const user = await db.user.findFirst({
          where: { email: credentials.identifier },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

     
        if (credentials.password !== user.password) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {    
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
