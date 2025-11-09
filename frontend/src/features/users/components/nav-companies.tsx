import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useGetUserCompanies } from "../api/get-user-companies";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface Props {
  location: string;
}
export const NavCompanies = ({ location }: Props) => {
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
      {data.length === 0 ? (
        <Link to="/dashboard/companies">
          <SidebarMenuItem>Unete a una compañia</SidebarMenuItem>
        </Link>
      ) : (
        data.map(({ companies }) => (
          <SidebarMenuItem key={companies.name}>
            <SidebarMenuButton
              className={cn("font-medium", {
                "text-primary":
                  location === `/dashboard/${companies.id}/projects`,
              })}
              asChild
            >
              <Link
                to="/dashboard/$companyId/projects"
                params={{ companyId: companies.id }}
              >
                <span>{companies.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))
      )}
    </SidebarMenu>
  );
};
