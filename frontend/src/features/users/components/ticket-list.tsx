import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TicketCard } from "@/features/tickets/components/ticket-card";
import { TicketCardSkeleton } from "@/features/tickets/components/ticket-card-skeleton";
import { useGetUserTickets } from "@/features/users/api/get-user-tickets";
import { Link } from "@tanstack/react-router";
import { TicketsIcon } from "lucide-react";

export const TicketList = () => {
  const { data, error, isLoading } = useGetUserTickets();
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <TicketCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return <div>something bad happened</div>;
  }

  if (!data || data.length === 0) {
    return (
      <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TicketsIcon />
          </EmptyMedia>
          <EmptyTitle>No has sido asignado a ningún ticket</EmptyTitle>
          <EmptyDescription>
            Únete a una compañia y a uno de sus proyectos
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/dashboard/companies">
            <Button variant="outline" size="sm">
              Ver compañias
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div className="flex flex-col max-w-4xl mx-auto ">
      {data?.map(({ ticket }) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
