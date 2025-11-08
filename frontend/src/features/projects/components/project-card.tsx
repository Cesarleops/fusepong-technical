import { useJoinProject } from "@/features/companies/api/join-project";
import type { Project } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  project: Project;
}
export const ProjectCard = ({ project }: Props) => {
  const joinProject = useJoinProject();
  const navigate = useNavigate();
  const handleJoinProject = () => {
    joinProject.mutate(project.id, {
      onSuccess: () => {
        navigate({
          to: `/dashboard/projects/${project.id}/stories`,
        });
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  };
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
        <p className="text-sm text-gray-600 truncate">{project.description}</p>
      </div>

      <div className="shrink-0">
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <Button
        disabled={joinProject.isPending}
        onClick={() => handleJoinProject()}
      >
        Unirme
      </Button>
    </div>
  );
};
