import type { UserStory } from "../types";
import { UserStoryCard } from "./user-story-card";

interface Props {
  userStories: UserStory[];
}
export const UserStoryList = ({ userStories }: Props) => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-4">
      {userStories?.map((userStory) => (
        <UserStoryCard key={userStory.id} userStory={userStory} />
      ))}
    </div>
  );
};
