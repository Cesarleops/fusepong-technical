import { toast } from "sonner";
import { CreateUserStorySchema } from "../schemas";
import type { CreateTicket } from "@/features/tickets/types";
import { CreateTicketSchema } from "@/features/tickets/schemas";
import { useState, type FormEvent } from "react";
import { useCreateTicket } from "@/features/tickets/api/create-ticket";
import { useCreateStory } from "../api/create-user-story";
import { useSession } from "@/lib/auth-client";

export const useCreateUserStoryForm = (projectId: string) => {
  const { data } = useSession();

  const createUserStory = useCreateStory();
  const createTicket = useCreateTicket();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userStory, setUserStory] = useState({
    name: "",
    description: "",
  });

  const [ticket, setTicket] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const userStoryData = {
      ...userStory,
      projectId,
    };

    const ticketData: Omit<CreateTicket, "userStoryId"> = {
      ...ticket,
      authorId: data?.user.id as string,
    };

    const validateTicketFields = CreateTicketSchema.omit({
      userStoryId: true,
    }).safeParse(ticketData);

    if (!validateTicketFields.success) {
      setIsSubmitting(false);
      toast.error("Por favor verifica los datos del ticket");
      return;
    }

    try {
      const userStoryId = await createUserStory.mutateAsync(userStoryData);
      await createTicket.mutateAsync({ ...ticketData, userStoryId });
      setOpen(false);
      reset();
      toast.success("La historia se ha creado con exito");
    } catch (e) {
      let message = "No se pudo crear la historia";
      if (e instanceof Error) {
        message = e.message;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    const validateUserStory = CreateUserStorySchema.safeParse({
      ...userStory,
      projectId,
    });

    if (!validateUserStory.success) {
      toast.error("Por favor verifica los datos de la historia");
      return;
    }

    setStep(2);
  };

  const reset = () => {
    setUserStory({
      name: "",
      description: "",
    });
    setTicket({
      name: "",
      description: "",
    });
    setStep(1);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return {
    userStory,
    ticket,
    open,
    step,
    isSubmitting,
    setOpen,
    setTicket,
    setUserStory,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    reset,
  };
};
