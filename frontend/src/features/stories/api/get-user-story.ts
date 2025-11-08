import { useQuery } from "@tanstack/react-query";
import type { UserStory } from "../types";
import type { Ticket } from "@/features/tickets/types";
import { userStories } from "../query-keys";
import { API_URL } from "@/config/api";

export const getUserStory = async (
  userStoryId: string,
): Promise<UserStory & { tickets: Ticket[] }> => {
  const response = await fetch(`${API_URL}/user-stories/${userStoryId}`, {
    credentials: "include",
  });
  const data = await response.json();
  console.log("data", data);
  return data;
};

export function useGetUserStory(userStoryId: string) {
  return useQuery({
    queryKey: userStories.detail(userStoryId).queryKey,
    queryFn: () => getUserStory(userStoryId),
  });
}
