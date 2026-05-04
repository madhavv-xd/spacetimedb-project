import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    /**
     * Runs after a successful sign-in.
     * We expose the Google profile data on the session so the client
     * can use it (e.g. pre-populate the SpacetimeDB username).
     */
    async jwt({ token, profile }) {
      if (profile) {
        token.picture = profile.picture as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the avatar URL available in the client session
      if (token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
