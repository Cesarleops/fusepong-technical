import { useQuery } from "@tanstack/react-query";
import { users } from "../query-keys";
import { API_URL } from "@/config/api";
import type { UserProjects } from "../types";

export const getUserProjects = async (): Promise<UserProjects[]> => {
  const response = await fetch(`${API_URL}/api/user/projects`);
  const data = await response.json();
  return data;
};

export function useGetUserProjects() {
  return useQuery({
    queryKey: users.listProjects.queryKey,
    queryFn: () => getUserProjects(),
  });
}
