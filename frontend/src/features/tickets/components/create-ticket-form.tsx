import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCreateTicket } from "../api/create-ticket";
import { TicketForm } from "./ticket-form";
import { CreateTicketSchema } from "../schemas";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface Props {
  userStoryId: string;
}
export const CreateTicketForm = ({ userStoryId }: Props) => {
  const { data } = useSession();

  const [ticket, setTicket] = useState({
    name: "",
    description: "",
  });

  const createTicket = useCreateTicket();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setTicket((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ticketData = {
      ...ticket,
      userStoryId,
      authorId: data?.user.id as string,
    };
    const validateFields = CreateTicketSchema.safeParse(ticketData);
    if (!validateFields.success) {
      toast.error("algo salio mal creando tu ticket");
      return;
    }
    createTicket.mutate(ticketData);
  };

  return (
    <TicketForm
      ticket={ticket}
      isUpdating={false}
      triggerText="Crear ticket"
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
