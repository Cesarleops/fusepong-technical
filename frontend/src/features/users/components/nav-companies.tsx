import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useGetUserCompanies } from "../api/get-user-companies";
import { Link } from "@tanstack/react-router";

export const NavCompanies = () => {
  const { data, isLoading } = useGetUserCompanies();

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
      {data.map(({ companies }) => (
        <SidebarMenuItem key={companies.name}>
          <SidebarMenuButton asChild>
            <Link to={`/dashboard/${companies.id}/projects`}>
              <span>{companies.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
