import { Skeleton } from "@/components/ui/skeleton";
import { useGetProject } from "@/features/projects/api/get-project";
import { CreateUserStoryForm } from "@/features/stories/components/create-user-story-form";
import { UserStoryCardSkeleton } from "@/features/stories/components/story-card-skeleton";
import { UserStoryList } from "@/features/stories/components/user-story-list";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BookIcon } from "lucide-react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { data, error, isLoading } = useGetProject(projectId);

  if (isLoading) {
    return (
      <div className="w-full">
        <header className="mb-8">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-36" />
        </header>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <UserStoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Algo salió mal obteniendo el proyecto</div>;
  }
  return (
    <section>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{data?.name}</h3>
          <CreateUserStoryForm projectId={projectId} />
        </div>
        <p className="text-foreground">Historias de usuario</p>
      </header>
      {data?.userStories.length === 0 ? (
        <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookIcon />
            </EmptyMedia>
            <EmptyTitle>Este proyecto aún no tiene historias</EmptyTitle>
            <EmptyDescription>Puedes crear una</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <CreateUserStoryForm projectId={projectId} />
          </EmptyContent>
        </Empty>
      ) : (
        <UserStoryList userStories={data?.userStories || []} />
      )}
    </section>
  );
}
