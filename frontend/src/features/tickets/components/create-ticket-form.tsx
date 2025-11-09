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

  const [open, setOpen] = useState(false);

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

  const reset = () => {
    setTicket({
      name: "",
      description: "",
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
      toast.error("El nombre no puede estar vacio");
      return;
    }

    createTicket.mutate(ticketData, {
      onSuccess: () => {
        setTicket({
          name: "",
          description: "",
        });
        setOpen(false);
      },
    });
  };

  return (
    <TicketForm
      ticket={ticket}
      reset={reset}
      isUpdating={false}
      openForm={open}
      isLoadingAction={createTicket.isPending}
      setOpen={setOpen}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
