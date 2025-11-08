import { createQueryKeys } from "@lukemorales/query-key-factory";

export const projects = createQueryKeys("projects", {
  detail: (id: string) => ({ queryKey: [{ id }] }),
});
