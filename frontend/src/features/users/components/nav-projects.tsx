import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useGetUserProjects } from "../api/get-user-projects";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface Props {
  location: string;
}
export const NavProjects = ({ location }: Props) => {
  const { data, isLoading } = useGetUserProjects();

  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 2 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  if (!data) {
    return;
  }

  return (
    <SidebarMenu>
      {data.map(({ projects }) => (
        <SidebarMenuItem key={projects.name}>
          <SidebarMenuButton
            className={cn("font-medium", {
              "text-primary": location === `/dashboard/projects/${projects.id}`,
            })}
            asChild
          >
            <Link to={`/dashboard/projects/${projects.id}`}>
              <span>{projects.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
