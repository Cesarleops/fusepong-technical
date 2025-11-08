import { useState, type ChangeEvent, type FormEvent } from "react";
import { TicketForm } from "./ticket-form";
import { UpdateTicketSchema } from "../schemas";
import { toast } from "sonner";
import type { Ticket } from "../types";

interface Props {
  ticket: Ticket;
}
export const UpdateTicketForm = ({ ticket }: Props) => {
  const [ticketForm, setTicketForm] = useState(() => ({
    name: ticket.name,
    description: ticket.description,
    status: ticket.status,
  }));

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
      id: ticket.id,
      ...ticketForm,
    };

    const validateFields = UpdateTicketSchema.safeParse(dataToUpdate);

    if (!validateFields.success) {
      console.log("error", validateFields.error.flatten().fieldErrors);
      toast.error("Something went wrong updating your ticket");
      return;
    }
  };
  return (
    <TicketForm
      isUpdating={true}
      ticket={ticketForm}
      triggerText="Actualizar"
      handleStatusChange={handleStatusChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
