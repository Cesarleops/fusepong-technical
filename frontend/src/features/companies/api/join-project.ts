import { API_URL } from "@/config/api";
import { users } from "@/features/users/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const joinProject = async (projectId: string) => {
  const response = await fetch(`${API_URL}/user/projects/${projectId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Algo salio mal");
  }
  return data;
};

export function useJoinProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => joinProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: users.listProjects.queryKey,
      });
    },
  });
}
