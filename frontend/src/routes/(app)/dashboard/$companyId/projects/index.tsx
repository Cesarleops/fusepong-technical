import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompany } from "@/features/companies/api/get-company";
import { CompanyCardSkeleton } from "@/features/companies/components/company-card-skeleton";
import { ProjectCard } from "@/features/projects/components/project-card";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectorIcon } from "lucide-react";

export const Route = createFileRoute("/(app)/dashboard/$companyId/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data, error, isLoading } = useGetCompany(companyId);
  if (isLoading) {
    return (
      <div className="w-full">
        <header className="mb-8">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-36" />
        </header>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CompanyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Algo salio mal obteniendo la compañia</div>;
  }
  return (
    <section className="w-full">
      <header className="mb-8">
        <h3 className="text-xl font-semibold">Proyectos de {data?.name}</h3>
        <p className="text-foreground text-sm">NIT {data?.nit}</p>
      </header>
      <div className="max-w-3xl mx-auto">
        {!data || data.projects.length === 0 ? (
          <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ProjectorIcon />
              </EmptyMedia>
              <EmptyTitle>Esta compañia no tiene proyectos</EmptyTitle>
              <EmptyDescription>
                Espera a que un administrador cree uno para que puedas
                unirte{" "}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          data?.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isCompanyView={true}
            />
          ))
        )}
      </div>
    </section>
  );
}
