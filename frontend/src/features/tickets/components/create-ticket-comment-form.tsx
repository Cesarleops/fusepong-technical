import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTicketComment } from "../api/create-ticket-comment";
import { useSession } from "@/lib/auth-client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CreateTicketCommentSchema } from "../schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon, MessageSquareMoreIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  ticketId: string;
  userStoryId: string;
}
export const CreateTicketCommentForm = ({ ticketId, userStoryId }: Props) => {
  const { data } = useSession();

  const createComment = useCreateTicketComment(userStoryId);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquareMoreIcon className="h-4 w-4" />
          Añadir comentario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deja un comentario</DialogTitle>
          <DialogDescription>Comparte alguna idea o aviso</DialogDescription>
        </DialogHeader>
        <form className="grid w-full gap-2" onSubmit={handleSubmit}>
          <Textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Añade un comentario"
            maxLength={255}
          />
          <p className="text-right text-muted-foreground text-xs">
            {comment.length}/255
          </p>
          <footer className="flex justify-end">
            <Button disabled={comment.length === 0 || createComment.isPending}>
              {createComment.isPending ? (
                <span>
                  <LoaderIcon className="animate-spin" />
                </span>
              ) : (
                "Añadir"
              )}
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};
