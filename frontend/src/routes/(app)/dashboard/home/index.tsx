import { TicketList } from "@/features/users/components/ticket-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/home/")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <section className="w-full">
      <header className="mb-8">
        <h3 className="text-xl font-semibold">Home</h3>
        <p className="text-foreground">Echale un vistazo a tus tickets</p>
      </header>
      <TicketList />
    </section>
  );
}
