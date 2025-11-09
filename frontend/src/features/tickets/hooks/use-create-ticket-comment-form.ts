import { useState, type ChangeEvent, type FormEvent } from "react";
import { CreateTicketCommentSchema } from "../schemas";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { useCreateTicketComment } from "../api/create-ticket-comment";

export const useCreateTicketCommentForm = (
  userStoryId: string,
  ticketId: string,
) => {
  const { data } = useSession();

  const createComment = useCreateTicketComment(userStoryId);

  const isSubmitting = createComment.isPending;
  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ticketData = {
      ticketId,
      authorId: data?.user.id as string,
      comment,
    };
    const validateFields = CreateTicketCommentSchema.safeParse(ticketData);
    if (!validateFields.success) {
      toast.error("Por favor añade un comentario");
      return;
    }

    createComment.mutate(ticketData, {
      onSuccess: () => {
        toast.success("Tu comentario fue añadido!");
        setComment("");
        setOpen(false);
      },
      onError: () => {
        toast.error("No pudimos agregar tu comentario, intenta más tarde.");
      },
    });
  };

  return {
    comment,
    open,
    isSubmitting,
    handleCommentChange,
    handleSubmit,
    setOpen,
  };
};
