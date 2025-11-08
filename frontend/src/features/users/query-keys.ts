import { createQueryKeys } from "@lukemorales/query-key-factory";

export const users = createQueryKeys("users", {
  listCompanies: null,
  listProjects: null,
  listTickets: null,
});
