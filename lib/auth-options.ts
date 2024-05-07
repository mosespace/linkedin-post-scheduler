import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { toast } from "sonner";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as any,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
    }),
    CredentialsProvider({
      name: "Your Credentials",
      credentials: {
        firstName: { label: "First Name", type: "text", placeholder: "John" },
        lastName: { label: "Second Name", type: "text", placeholder: "Doe" },
        email: {
          label: "email",
          type: "email",
          placeholder: "linker@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // console.log(credentials);
        try {
          if (!credentials?.email) {
            // console.log("Step 2 ✅:", "No Valid Inputs Found");
            return null;
          }

          const existing_user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          // console.log("Step 3 ✅:", `User With Email Exists: ${existing_user}`);

          if (!existing_user) {
            console.log("Step 4 ✅:", "No user with Email has been Found");
            return null; // Explicitly return null here
          }

          // console.log("Provided Password:", credentials.password);
          // console.log("Database Password:", existing_user.password);

          const passwordMatch = await compare(
            credentials.password,
            existing_user.password
          );

          console.log("Password Match:", passwordMatch);

          if (!passwordMatch) {
            console.log("The password is incorrect");
            return null;
          }

          const user = {
            id: existing_user.id,
            firstName: existing_user.firstName,
            lastName: existing_user.lastName,
            email: existing_user.email,
            password: existing_user.password,
          };

          // console.log("Step 6 ✅:", `User Updated Successfully ${user}`);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(`Everything Has Failed: ${error}`);
          return null; // Handle errors gracefully and return null
        }
      },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token && session) {
        session.user = {
          token: token.accessToken,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          image: token.picture,
          role: token.role,
        } as {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          image?: string | null;
          role?: string;
          token?: string | null | undefined;
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      const email = token.email || user.email;

      const dbUser = await db.user.findFirst({
        where: {
          email: email as string,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },

  pages: {
    signIn: "/login",
  },

  adapter: PrismaAdapter(prisma) as any,

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET as any,
};

export default authOptions;
