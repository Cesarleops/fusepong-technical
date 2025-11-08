import type { Ticket } from "../types";

interface Props {
  ticket: Ticket;
}

const statusMap = {
  active: "Activo",
  cancelled: "Cancelado",
  completed: "Completado",
  in_progress: "En Proceso",
};

export const TicketCard = ({ ticket }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <header className="w-full flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 truncate">
            {ticket.name}
          </h3>
          <div className="px-1 py-1 border border-slate-200 rounded-lg font-medium text-sm">
            {statusMap[ticket.status]}
          </div>
        </header>

        <p className="text-sm text-gray-600 truncate">{ticket.description}</p>
      </div>
    </div>
  );
};
