import { Link } from "@tanstack/react-router";
import { formatDate } from "@/lib/utils";
import type { UserStory } from "../types";
import { Button } from "@/components/ui/button";

interface Props {
  userStory: UserStory;
}

export const UserStoryCard = ({ userStory }: Props) => {
  const formattedDate = formatDate(userStory.created_at);
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {userStory.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {userStory.description}
        </p>
      </div>

      <div className="shrink-0">
        <span className="text-xs font-medium text-gray-500">
          Creado {formattedDate}
        </span>
      </div>
      <footer className="flex justify-end">
        <Button>
          <Link
            to={`/dashboard/projects/${userStory.projectId}/stories/${userStory.id}`}
          >
            Ver historia
          </Link>
        </Button>
      </footer>
    </div>
  );
};
