import { BACKEND_URL } from "@/config/api";
import { createAuthClient } from "better-auth/react";

console.log("backurl", BACKEND_URL);
export const authClient = createAuthClient({
  baseURL: BACKEND_URL,
});

export const useSession = authClient.useSession;
