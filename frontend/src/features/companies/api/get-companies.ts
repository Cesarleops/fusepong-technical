import { API_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { companies } from "../query-keys";
import type { Company } from "../types";

const getCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_URL}/companies`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export function useGetCompanies() {
  return useQuery({
    queryKey: companies.list.queryKey,
    queryFn: getCompanies,
  });
}
