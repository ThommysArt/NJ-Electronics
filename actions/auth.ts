"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { EmailSignInSchema } from "@/constants/zod";
import { getUserByEmail } from "@/utils/user";
import { DEFAULT_SIGNIN_REDIRECT } from "@/constants/routes";
import { prisma } from "@/prisma/connection";


export const EmailLogin = async (
  values: z.infer<typeof EmailSignInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = EmailSignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: "Invalid Credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_SIGNIN_REDIRECT,
    });

    return { success: "Login Sucess!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export async function SignUpAction (values: z.infer<typeof EmailSignInSchema>, callbackUrl?: string | null) {
  const validatedFields = EmailSignInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
  })

  if (user) {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: callbackUrl || DEFAULT_SIGNIN_REDIRECT
    })
  } else {
    return { error: "Failed to create user!" }
  }

  return { success: "User created successfully!" }
}

export async function SignOutAction () {
  await signOut()
}

