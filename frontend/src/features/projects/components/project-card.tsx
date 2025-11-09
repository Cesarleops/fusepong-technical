import { useJoinProject } from "@/features/companies/api/join-project";
import type { Project } from "../types";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Props {
  project: Project;
  isCompanyView: boolean;
}
export const ProjectCard = ({ project, isCompanyView }: Props) => {
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
  const formattedDate = formatDate(project.created_at);
  return (
    <div className=" rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
        <p className="text-sm text-gray-600 truncate">{project.description}</p>
      </div>

      <div className="shrink-0">
        <span className="text-xs text-gray-500">Creado {formattedDate}</span>
      </div>
      <footer className="flex justify-end">
        {isCompanyView ? (
          <Link
            to="/dashboard/projects/$projectId"
            params={{
              projectId: project.id,
            }}
          >
            <Button>Ver historias</Button>
          </Link>
        ) : (
          <Button
            disabled={joinProject.isPending}
            onClick={() => handleJoinProject()}
          >
            Unirme
          </Button>
        )}
      </footer>
    </div>
  );
};
