import { API_URL } from "@/config/api";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: API_URL,
});
