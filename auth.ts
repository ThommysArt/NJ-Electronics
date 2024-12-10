import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import Passkey from "next-auth/providers/passkey"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/connection"
import { getUserById, getUserByEmail } from "./utils/user"
import { getAccountByUserId } from "./utils/account"
import { EmailSignInSchema } from "@/constants/zod";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      Credentials({
        async authorize(credentials) {
          const validatedFields = EmailSignInSchema.safeParse(credentials);
  
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
  
            if (!user || !user.password) return null;
  
            const passwordsMatch = await bcrypt.compare(password, user.password);
  
            if (passwordsMatch) return user;
          }
  
          return null;
        },
      }),
      Passkey({
            formFields: {
            email: {
                label: "Email",
                required: true,
                autocomplete: "email webauthn",
            },
            },
      }),
    ],
    experimental: { enableWebAuthn: true },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
        error: "auth/error"
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
              session.user.id = token.sub;
            }
      
            if (session.user) {
              session.user.name = token.name;
              session.user.email = token.email!;
            }
      
            return session;
          },
          async jwt({ token }) {
            if (!token.sub) return token;
      
            const existingUser = await getUserById(token.sub);
      
            if (!existingUser) return token;
      
            const existingAccount = await getAccountByUserId(existingUser.id);
      
            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
      
            return token;
          },
    }
})