import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useGetUserProjects } from "../api/get-user-projects";
import { Link } from "@tanstack/react-router";

export const NavProjects = () => {
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
          <SidebarMenuButton asChild>
            <Link
              to={`/dashboard/${projects.companyId}/projects/${projects.id}`}
            >
              <span>{projects.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
