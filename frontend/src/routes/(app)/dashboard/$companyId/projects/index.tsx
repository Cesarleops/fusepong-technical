import { useGetCompany } from "@/features/companies/api/get-company";
import { ProjectCard } from "@/features/projects/components/project-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/$companyId/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { companyId } = Route.useParams();
  const { data, error, isLoading } = useGetCompany(companyId);
  console.log("d", data);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <>bad bad</>;
  }
  return (
    <section className="w-full">
      <header className="mb-8">
        <h3 className="text-xl font-semibold">{data?.name}</h3>
        <p className="text-foreground">{data?.nit}</p>
      </header>
      <div>
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
