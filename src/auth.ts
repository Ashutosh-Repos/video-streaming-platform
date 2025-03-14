import NextAuth from "next-auth";
import { dbConnect } from "./lib/dbConn";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import {
  userValidation,
  emailValidation,
  passwordValidation,
} from "./app/zod/commonValidations";
import { userModel, Iuser } from "./app/models/user";
import bcrypt from "bcryptjs";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";

const credentialsValidation = z.object({
  identifier: z.union([userValidation, emailValidation]),
  password: passwordValidation,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();
          console.log("1");

          const parseResult = credentialsValidation.safeParse(credentials);

          if (!parseResult.success) {
            throw new Error("invalid username or email");
          }
          const { identifier, password } = parseResult.data;

          const user = await userModel.findOne<Iuser>({
            $or: [{ username: identifier }, { email: identifier }],
            $and: [{ verified: true }],
          });

          if (!user || !user?.password)
            throw new Error("password is not set, use oAuths");

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) throw new Error("invalid credentials");

          console.log("7");
          const userData = {
            email: user.email as string,
            username: user.username as string,
            id: user._id.toString() as string,
          };

          console.log("8");
          return userData;
        } catch (error: any) {
          console.log("0");
          return null;
        }
      },
    }),
    GoogleProvider,
    GitHubProvider,
    AppleProvider,
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

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
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  secret: process.env.AUTH_SECRET,
});
