import { useGetProject } from "@/features/projects/api/get-project";
import { UserStoryList } from "@/features/stories/components/user-story-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/$projectId/")({
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
      <header>Cool project</header>
      <UserStoryList userStories={data} />
    </section>
  );
}
