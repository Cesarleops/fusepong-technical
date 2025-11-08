import { useState, type ChangeEvent, type FormEvent } from "react";
import { TicketForm } from "./ticket-form";
import { UpdateTicketSchema } from "../schemas";
import { toast } from "sonner";
import { useUpdateTicket } from "../api/update-ticket";
import type { Ticket } from "../types";

interface Props {
  ticket: Ticket;
}
export const UpdateTicketForm = ({ ticket }: Props) => {
  const [ticketForm, setTicketForm] = useState(() => ({
    name: ticket.name,
    description: ticket.description,
    status: ticket.status as Ticket["status"],
  }));

  const [open, setOpen] = useState(false);

  const updateTicket = useUpdateTicket(ticket.userStoryId);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setTicketForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleStatusChange = (status: string) => {
    setTicketForm((prev) => ({
      ...prev,
      status: status as Ticket["status"],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dataToUpdate = {
      ...ticketForm,
    };

    const validateFields = UpdateTicketSchema.safeParse(dataToUpdate);

    if (!validateFields.success) {
      toast.error("Verifica los datos del ticket");
      return;
    }

    updateTicket.mutate(
      {
        ticketId: ticket.id,
        data: dataToUpdate,
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
  return (
    <TicketForm
      isUpdating={true}
      openForm={open}
      setOpen={setOpen}
      ticket={ticketForm}
      isLoadingAction={updateTicket.isPending}
      handleStatusChange={handleStatusChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
