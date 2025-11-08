import { TicketCard } from "@/features/tickets/components/ticket-card";
import { useGetUserTickets } from "@/features/users/api/get-user-tickets";

export const TicketList = () => {
  const { data, error, isLoading } = useGetUserTickets();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>something bad happened</div>;
  }

  if (!data || data.length === 0) {
    return <div>Parece que aún no has sido asignado a ningún ticket!</div>;
  }
  return (
    <div className="flex flex-col max-w-4xl mx-auto ">
      {data?.map(({ tickets }) => (
        <TicketCard ticket={tickets} />
      ))}
    </div>
  );
};
