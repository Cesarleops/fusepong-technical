import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../features/auth/components/login-form";

export const Route = createFileRoute("/(auth)/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <LoginForm />
    </div>
  );
}
