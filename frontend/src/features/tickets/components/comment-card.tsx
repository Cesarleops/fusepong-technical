import type { TicketComment } from "../types";

interface Props {
  comment: TicketComment;
}

export const TicketCommentCard = ({ comment }: Props) => {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        {
          //TODO: SHOW INITIALS
        }
        <div className="flex-1">
          <p className="text-sm font-semibold text-card-foreground">
            {comment.authorId}
          </p>
          <p className="text-xs text-muted-foreground">
            {
              // TODO: SHOW TIME SINCE COMMENT
            }
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm leading-6 text-card-foreground">
          {comment.comment}
        </p>
      </div>
    </article>
  );
};
