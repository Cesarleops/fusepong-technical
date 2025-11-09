import { TicketForm } from "./ticket-form";
import { useUpdateTicketForm } from "../hooks/use-update-ticket-form";
import type { Ticket } from "../types";

interface Props {
  ticket: Ticket;
}
export const UpdateTicketForm = ({ ticket }: Props) => {
  const {
    ticketForm,
    open,
    setOpen,
    isLoadingAction,
    handleInputChange,
    handleStatusChange,
    handleSubmit,
  } = useUpdateTicketForm(ticket);

  return (
    <TicketForm
      isUpdating={true}
      openForm={open}
      setOpen={setOpen}
      ticket={ticketForm}
      isLoadingAction={isLoadingAction}
      handleStatusChange={handleStatusChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
