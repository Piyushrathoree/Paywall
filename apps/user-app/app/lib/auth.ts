import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  phone: z.string().min(6).max(12),
  password: z.string(),
});
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials) {
        if (!credentials?.phone || !credentials.password) {
          return null;
        }

        const result = credentialsSchema.safeParse(credentials);
        if (!result.success) {
          return null;
        }

        const { phone, password } = result.data;
        const existingUser = await db.user.findFirst({
          where: {
            number: phone,
          },
        });

        // Registration is intentionally handled by /api/auth/register. Keeping
        // authorize login-only prevents an accidental typo from creating an
        // account and makes the sign-in/sign-up flow explicit to the user.
        if (!existingUser) {
          return null;
        }

        const passwordValidation = await bcrypt.compare(password, existingUser.password);
        if (passwordValidation) {
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
