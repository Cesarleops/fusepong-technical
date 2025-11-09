import { API_URL } from "@/config/api";
import type { CreateUserStory, UserStory } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userStories } from "../query-keys";
import { projects } from "@/features/projects/query-keys";

export const createUserStory = async (
  data: CreateUserStory,
): Promise<UserStory["id"]> => {
  const response = await fetch(`${API_URL}/projects/user-stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create story");
  }
  return result;
};

export function useCreateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserStory) => createUserStory(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: projects.detail(variables.projectId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: userStories.listStories(variables.projectId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: userStories.detail._def,
      });
    },
  });
}
