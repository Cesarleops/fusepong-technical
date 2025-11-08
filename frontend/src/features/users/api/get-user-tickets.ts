import { useQuery } from "@tanstack/react-query";
import { users } from "../query-keys";
import { API_URL } from "@/config/api";
import type { UserTickets } from "../types";

export const getUserTickets = async (): Promise<UserTickets[]> => {
  const response = await fetch(`${API_URL}/user/tickets`, {
    credentials: "include",
  });
  const data = await response.json();
  console.log("d", data);
  return data;
};

export function useGetUserTickets() {
  return useQuery({
    queryKey: users.listTickets.queryKey,
    queryFn: () => getUserTickets(),
  });
}
