import { useSession } from "@/lib/auth-client";
import { useTicketFormDialog } from "./use-ticket-form-dialog";
import { CreateTicketSchema } from "../schemas";
import { toast } from "sonner";
import { useCreateTicket } from "../api/create-ticket";
import { useTicketForm } from "./use-ticket-form";
import type { FormEvent } from "react";

export const useCreateTicketForm = (userStoryId: string) => {
  const { data } = useSession();
  const createTicket = useCreateTicket();

  const { open, setOpen } = useTicketFormDialog();

  const {
    formData: ticketForm,
    handleInputChange,
    reset,
  } = useTicketForm({
    name: "",
    description: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const ticketData = {
      ...ticketForm,
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
        reset();
        setOpen(false);
        toast.success("El ticket fue creado exitosamente");
      },
      onError: () => {
        toast.error("Algo salió mal creando el ticket");
      },
    });
  };

  return {
    ticketForm,
    open,
    setOpen,
    isLoadingAction: createTicket.isPending,
    handleInputChange,
    handleSubmit,
    reset,
  };
};
