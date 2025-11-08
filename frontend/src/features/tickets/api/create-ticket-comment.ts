import { API_URL } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userStories } from "@/features/stories/query-keys";
import type { CreateTicketComment } from "../types";

export const createTicketComment = async (data: CreateTicketComment) => {
  const response = await fetch(`${API_URL}/tickets/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Something bad happened");
  }
};

export function useCreateTicketComment(userStoryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTicketComment) => createTicketComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userStories.detail(userStoryId).queryKey,
      });
    },
  });
}
