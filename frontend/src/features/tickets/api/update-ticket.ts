import { API_URL } from "@/config/api";
import type { UpdateTicket } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userStories } from "@/features/stories/query-keys";
import { users } from "@/features/users/query-keys";

export const updateTicket = async (ticketId: string, data: UpdateTicket) => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
};

export function useUpdateTicket(userStoryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ticketId,
      data,
    }: {
      ticketId: string;
      data: UpdateTicket;
    }) => updateTicket(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userStories.detail(userStoryId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: users.listTickets.queryKey,
      });
    },
  });
}
