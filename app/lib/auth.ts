import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "./db";
// import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {
        //   label: "Email",
        //   type: "email",
        //   placeholder: "Enter your email",
        // },
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username },
        });
        if (!existingUser) {
          return null;
        }

        // const passwordMatch = await compare(
        //   credentials.password,
        //   existingUser.password
        // );

        //dont use bcrypt compare
        const passwordMatch = credentials.password === existingUser.password;

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          // name: existingUser.username,
          name: existingUser.ThaiName,
          email: existingUser.email,
          employeeId: existingUser.employeeId,
          image_url: existingUser.image_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          employeeId: user.employeeId,
          image_url: user.image_url,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          employeeId: token.employeeId,
          image_url: token.image_url,
        },
      };
    },
  },
};
