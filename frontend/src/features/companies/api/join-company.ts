import { API_URL } from "@/config/api";
import { users } from "@/features/users/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const joinCompany = async (companyId: string) => {
  const response = await fetch(`${API_URL}/user/companies/${companyId}`, {
    method: "POST",

    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Algo salio mal");
  }
  return data;
};

export function useJoinCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (companyId: string) => joinCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: users.listCompanies.queryKey,
      });
    },
  });
}
