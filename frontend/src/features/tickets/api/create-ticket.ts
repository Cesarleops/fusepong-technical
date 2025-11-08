import { API_URL } from "@/config/api";
import type { CreateTicket } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userStories } from "@/features/stories/query-keys";

export const createTicket = async (data: CreateTicket) => {
  const response = await fetch(`${API_URL}/user-stories/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("SOmething bad happened");
  }
};

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTicket) => createTicket(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userStories.detail(variables.userStoryId).queryKey,
      });
    },
  });
}
