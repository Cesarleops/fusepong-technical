import { useQuery } from "@tanstack/react-query";
import { users } from "../query-keys";
import { API_URL } from "@/config/api";
import type { UserCompanies } from "../types";

export const getUserCompanies = async (): Promise<UserCompanies[]> => {
  const response = await fetch(`${API_URL}/api/user/companies`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export function useGetUserCompanies() {
  return useQuery({
    queryKey: users.listCompanies.queryKey,
    queryFn: () => getUserCompanies(),
  });
}
