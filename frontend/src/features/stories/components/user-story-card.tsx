import type { UserStory } from "../types";

interface Props {
  userStory: UserStory;
}

export const UserStoryCard = ({ userStory }: Props) => {
  const formattedDate = new Date(userStory.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
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
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
