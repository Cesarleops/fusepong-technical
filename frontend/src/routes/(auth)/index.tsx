import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "../../features/auth/components/sign-in-form";

export const Route = createFileRoute("/(auth)/")({
  component: Index,
});

function Index() {
  return (
    <section className="flex justify-center items-center h-full w-full">
      <main className="lg:w-[30%] lg:h-[45%] mx-auto p-4">
        <SignInForm />
      </main>
    </section>
  );
}
