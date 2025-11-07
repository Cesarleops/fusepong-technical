import z from "zod";
import { SignUpSchema, SignInSchema } from "./schemas";

export type UserSignIn = z.infer<typeof SignInSchema>;
export type UserSignUp = z.infer<typeof SignUpSchema>;
