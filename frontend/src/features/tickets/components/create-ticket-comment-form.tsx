import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon, MessageSquareMoreIcon } from "lucide-react";
import { useCreateTicketCommentForm } from "../hooks/use-create-ticket-comment-form";

interface Props {
  ticketId: string;
  userStoryId: string;
}
export const CreateTicketCommentForm = ({ ticketId, userStoryId }: Props) => {
  const {
    open,
    comment,
    isSubmitting,
    handleCommentChange,
    handleSubmit,
    setOpen,
  } = useCreateTicketCommentForm(userStoryId, ticketId);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquareMoreIcon className="h-4 w-4" />
          Añadir comentario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
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
            <Button
              className="w-22"
              disabled={comment.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
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
