import { API_URL } from "@/config/api";
import type { CreateTicket } from "../types";

export const createTicket = async (userStoryId: string, data: CreateTicket) => {
  const response = await fetch(`${API_URL}/stories/${userStoryId}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("SOmething bad happened");
  }
};

export function useCreateTicket() {}
