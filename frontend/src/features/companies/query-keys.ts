import { createQueryKeys } from "@lukemorales/query-key-factory";

export const companies = createQueryKeys("companies", {
  list: null,
  detail: (id: string) => ({
    queryKey: [{ id }],
  }),
});
