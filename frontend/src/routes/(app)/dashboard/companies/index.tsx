import { CompanyList } from "@/features/companies/components/company-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/companies/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <header className="mb-8">
        <h3 className="text-xl font-semibold">Compañias</h3>
        <p className="text-foreground">
          Puedes unirte a una compañia y empezar a trabajar en sus proyectos
        </p>
      </header>
      <CompanyList />
    </section>
  );
}
