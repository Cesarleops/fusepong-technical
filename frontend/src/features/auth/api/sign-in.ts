import { authClient } from "@/lib/auth-client";
import type { UserSignIn } from "../types";

export async function signIn({ email, password }: UserSignIn) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });
  if (error) {
    throw error;
  }

  return data;
}
