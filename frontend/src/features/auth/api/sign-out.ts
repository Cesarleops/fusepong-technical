import { authClient } from "@/lib/auth-client";

export async function signOut() {
  const { data, error } = await authClient.signOut();

  if (error) {
    throw error;
  }

  return data.success;
}
