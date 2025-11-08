import { authClient } from "@/lib/auth-client";
import type { UserSignIn } from "../types";

export async function signIn({ email, password }: UserSignIn) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });
  if (error) {
    if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
      throw new Error("Credenciales invalidas.");
    }
    throw error;
  }
  return data;
}
