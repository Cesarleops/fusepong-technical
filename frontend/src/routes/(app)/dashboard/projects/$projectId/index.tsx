import { useGetProject } from "@/features/projects/api/get-project";
import { CreateUserStoryForm } from "@/features/stories/components/create-story-form";
import { UserStoryList } from "@/features/stories/components/user-story-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();

  const { data, error, isLoading } = useGetProject(projectId);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>bad bad bad</div>;
  }
  return (
    <section>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{data?.name}</h3>
          <CreateUserStoryForm />
        </div>
        <p className="text-foreground">Historias de usuario</p>
      </header>
      <UserStoryList userStories={data?.userStories || []} />
    </section>
  );
}
