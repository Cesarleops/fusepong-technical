import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userStories = createQueryKeys("userStories", {
  listStories: (projectId: string) => ({
    queryKey: [{ projectId }],
  }),
  detail: (id: string) => ({
    queryKey: [{ id }],
  }),
});
