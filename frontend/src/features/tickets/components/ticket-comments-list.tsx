import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageSquareIcon } from "lucide-react";
import type { TicketComment } from "../types";
import { TicketCommentCard } from "./comment-card";

interface Props {
  comments: TicketComment[];
}
export const TicketCommentsList = ({ comments }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquareIcon className="h-4 w-4" />
          Ver comentarios
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Comentarios del ticket</SheetTitle>
          <SheetDescription>{comments.length} Comentarios</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 overflow-y-auto ">
          {comments.map((comment) => (
            <TicketCommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
