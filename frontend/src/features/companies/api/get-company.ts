import { useQuery } from "@tanstack/react-query";
import { companies } from "../query-keys";
import { API_URL } from "@/config/api";
import type { Company } from "../types";
import type { Project } from "@/features/projects/types";

export const getCompany = async (
  companyId: string,
): Promise<Company & { projects: Project[] }> => {
  const response = await fetch(`${API_URL}/companies/${companyId}`);
  const data = await response.json();
  return data;
};

export const useGetCompany = (companyId: string) => {
  return useQuery({
    queryKey: companies.detail(companyId).queryKey,
    queryFn: () => getCompany(companyId),
  });
};
