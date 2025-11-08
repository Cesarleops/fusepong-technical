import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "../../features/auth/components/sign-up-form";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex justify-center items-center h-full w-full">
      <header className="p-3">
        <h1 className="text-primary font-semibold text-xl">Obito</h1>
      </header>
      <main className="lg:w-[30%] lg:h-[45%] mx-auto p-4">
        <SignUpForm />
      </main>
    </section>
  );
}
