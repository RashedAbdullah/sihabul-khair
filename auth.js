import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialProviders from "next-auth/providers/credentials";
import { database_connection } from "./database/database-connection";
import { clientPromise } from "./database/client-promise";
import { userModel } from "./models/user-model";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  ...authConfig,
  providers: [
    CredentialProviders({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        await database_connection();

        try {
          const user = await userModel.findOne({
            email: credentials?.email,
          });
          if (user) {
            const isMatch = user.password === credentials.password;
            console.log("Matched auth user ", user);
            if (isMatch) {
              return user;
            } else {
              throw new Error("ইমেইল অথবা পাওসয়ার্ড সঠিক না।");
            }
          } else {
            throw new Error("এডমিনকে খুঁজে পাওয়া যায়নি।");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  // ✅ Add these callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
