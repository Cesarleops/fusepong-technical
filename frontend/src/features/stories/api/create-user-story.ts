import { API_URL } from "@/config/api";
import type { CreateUserStory } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userStories } from "../query-keys";

export const createUserStory = async (
  projectId: string,
  data: CreateUserStory,
) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create story");
  }
};

export function useCreateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: CreateUserStory;
    }) => createUserStory(projectId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userStories.listStories(variables.projectId).queryKey,
      });
    },
  });
}
