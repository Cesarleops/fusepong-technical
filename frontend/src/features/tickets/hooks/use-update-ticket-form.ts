import { useUpdateTicket } from "../api/update-ticket";
import { useTicketForm } from "./use-ticket-form";
import { useTicketFormDialog } from "./use-ticket-form-dialog";
import { UpdateTicketSchema } from "../schemas";
import { toast } from "sonner";
import type { Ticket } from "../types";
import type { FormEvent } from "react";

export const useUpdateTicketForm = (ticket: Ticket) => {
  const updateTicket = useUpdateTicket(ticket.userStoryId);

  const { open, setOpen } = useTicketFormDialog();

  const {
    formData: ticketForm,
    handleInputChange,
    updateField,
  } = useTicketForm({
    name: ticket.name,
    description: ticket.description,
    status: ticket.status as Ticket["status"],
  });

  const handleStatusChange = (status: string) => {
    updateField("status", status as Ticket["status"]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validateFields = UpdateTicketSchema.safeParse(ticketForm);
    if (!validateFields.success) {
      toast.error("Verifica los datos del ticket");
      return;
    }

    updateTicket.mutate(
      {
        ticketId: ticket.id,
        data: ticketForm,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Tu ticket fue actualizado");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return {
    ticketForm,
    open,
    setOpen,
    isLoadingAction: updateTicket.isPending,
    handleInputChange,
    handleStatusChange,
    handleSubmit,
  };
};
