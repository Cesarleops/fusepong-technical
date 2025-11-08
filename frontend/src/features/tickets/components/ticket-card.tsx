import { cn, formatDate } from "@/lib/utils";
import type { Ticket } from "../types";
import { UpdateTicketForm } from "./update-ticket-form";
import { CreateTicketCommentForm } from "./create-ticket-comment-form";
import { Badge } from "@/components/ui/badge";

interface Props {
  ticket: Ticket;
}

const statusMap = {
  active: "Activo",
  cancelled: "Cancelado",
  completed: "Completado",
  in_progress: "En Proceso",
};

const statusStyles: Record<string, string> = {
  active: "border-blue-200 bg-blue-50 text-blue-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
  completed: "border-green-200 bg-green-50 text-green-700",
  in_progress: "border-yellow-200 bg-yellow-50 text-yellow-700",
};
export const TicketCard = ({ ticket }: Props) => {
  const formattedDate = formatDate(ticket.created_at);
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex-1 min-w-0 space-y-1.5">
        <Badge
          variant={"outline"}
          className={cn(
            "  px-2.5 py-0.5 text-sm font-medium rounded-full",
            statusStyles[ticket.status],
          )}
        >
          Ticket {statusMap[ticket.status]}
        </Badge>

        <div className="flex justify-end">
          <UpdateTicketForm ticket={ticket} />
        </div>

        <header>
          <h3 className="font-semibold text-gray-900 truncate">
            {ticket.name}
          </h3>
          <p className="font-light text-sm text-foreground">
            Creado {formattedDate}
          </p>
        </header>

        <p className="text-sm text-gray-600 truncate">{ticket.description}</p>

        <footer className="mt-4">
          <CreateTicketCommentForm
            ticketId={ticket.id}
            userStoryId={ticket.userStoryId}
          />
        </footer>
      </div>
    </div>
  );
};
