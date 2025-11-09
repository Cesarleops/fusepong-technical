import type { TicketComment } from "../types";

interface Props {
  comment: TicketComment;
}

export const TicketCommentCard = ({ comment }: Props) => {
  return (
    <article className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0">
      <div className="flex w-full items-center gap-2">
        <span>{comment.author.name}</span>{" "}
        <span className="ml-auto text-xs">{comment.created_at}</span>
      </div>
      <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
        {comment.comment}
      </span>
    </article>
  );
};
