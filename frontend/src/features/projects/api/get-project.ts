import { API_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { projects } from "../query-keys";
import type { Project } from "../types";
import type { UserStory } from "@/features/stories/types";

export const getProject = async (
  projectId: string,
): Promise<Project & { userStories: UserStory[] }> => {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export function useGetProject(projectId: string) {
  return useQuery({
    queryKey: projects.detail(projectId).queryKey,
    queryFn: () => getProject(projectId),
  });
}
