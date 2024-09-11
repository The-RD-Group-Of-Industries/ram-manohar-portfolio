/**
 * Handles incoming requests for the NextAuth.js authentication API.
 * This function is exported as both the GET and POST handlers for the API route.
 */
import NextAuth from 'next-auth/next';
import { authOptions } from './options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };