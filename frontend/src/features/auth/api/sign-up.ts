import { authClient } from "@/lib/auth-client";
import type { UserSignUp } from "../types";

export async function signUp({ name, email, password }: UserSignUp) {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    throw error;
  }
  return data;
}
