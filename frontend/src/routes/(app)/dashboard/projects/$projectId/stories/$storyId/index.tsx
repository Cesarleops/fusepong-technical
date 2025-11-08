import { useGetUserStory } from "@/features/stories/api/get-user-story";
import { CreateTicketForm } from "@/features/tickets/components/create-ticket-form";
import { TicketCard } from "@/features/tickets/components/ticket-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(app)/dashboard/projects/$projectId/stories/$storyId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { storyId } = Route.useParams();
  const { data, error, isLoading } = useGetUserStory(storyId);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <>badbadbad</>;
  }
  return (
    <section>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{data?.name}</h3>
          <CreateTicketForm userStoryId={storyId} />
        </div>
        <p className="text-foreground">Tickets</p>
      </header>
      {data?.tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </section>
  );
}
