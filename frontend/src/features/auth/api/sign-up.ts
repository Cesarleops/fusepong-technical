import { authClient } from "@/lib/auth-client";
import type { UserSignUp } from "../types";

export async function signUp({ name, email, password }: UserSignUp) {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      throw new Error("El usuario ya esta registrado");
    }
    throw error;
  }
  return data;
}
