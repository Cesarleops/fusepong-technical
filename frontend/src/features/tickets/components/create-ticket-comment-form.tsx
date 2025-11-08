import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTicketComment } from "../api/create-ticket-comment";
import { useSession } from "@/lib/auth-client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CreateTicketCommentSchema } from "../schemas";

interface Props {
  ticketId: string;
  userStoryId: string;
}
export const CreateTicketCommentForm = ({ ticketId, userStoryId }: Props) => {
  const { data } = useSession();

  const [comment, setComment] = useState("");

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const createComment = useCreateTicketComment(userStoryId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ticketData = {
      ticketId,
      authorId: data?.user.id as string,
      comment,
    };
    const validateFields = CreateTicketCommentSchema.safeParse(ticketData);
    if (!validateFields.success) {
      return;
    }

    createComment.mutate(ticketData, {
      onSuccess: () => {
        setComment("");
      },
    });
  };

  return (
    <form className="grid w-full gap-2" onSubmit={handleSubmit}>
      <Textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Añade un comentario"
      />
      <p className="text-right text-muted-foreground text-xs">
        {comment.length}/255
      </p>
      <footer className="flex justify-end">
        <Button disabled={comment.length === 0}>Añadir</Button>
      </footer>
    </form>
  );
};
