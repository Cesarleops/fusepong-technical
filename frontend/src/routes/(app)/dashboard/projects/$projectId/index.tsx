import { useGetProject } from "@/features/projects/api/get-project";
import { UserStoryList } from "@/features/stories/components/user-story-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();

  const { data, error, isLoading } = useGetProject(projectId);

  console.log("p", data);
  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>bad bad bad</div>;
  }
  return (
    <section>
      <header className="mb-8">
        <h3 className="text-xl font-semibold">{data?.name}</h3>
        <p className="text-foreground">Historias de usuario</p>
      </header>
      <UserStoryList userStories={data?.userStories || []} />
    </section>
  );
}
