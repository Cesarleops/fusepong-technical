import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserStory } from "@/features/stories/api/get-user-story";
import { CreateTicketForm } from "@/features/tickets/components/create-ticket-form";
import { TicketCard } from "@/features/tickets/components/ticket-card";
import { TicketCardSkeleton } from "@/features/tickets/components/ticket-card-skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { TicketsIcon } from "lucide-react";

export const Route = createFileRoute(
  "/(app)/dashboard/projects/$projectId/stories/$storyId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { storyId } = Route.useParams();
  const { data, error, isLoading } = useGetUserStory(storyId);

  if (isLoading) {
    return (
      <div className="w-full">
        <header className="mb-8">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-36" />
        </header>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Algo salió mal obteniendo la historia de usuario</div>;
  }
  return (
    <section>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Historia de usuario /{data?.name}
          </h3>
          <CreateTicketForm userStoryId={storyId} />
        </div>
        <p className="text-foreground">Lista de tickets</p>
      </header>
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        {data?.tickets.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TicketsIcon />
              </EmptyMedia>
              <EmptyTitle>Esta historia aún no tiene tickets</EmptyTitle>
              <EmptyDescription>Puedes crear uno</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <CreateTicketForm userStoryId={storyId} />
            </EmptyContent>
          </Empty>
        ) : (
          data?.tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </section>
  );
}
