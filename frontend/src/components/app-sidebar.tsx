import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavCompanies } from "@/features/users/components/nav-companies";
import { NavProjects } from "@/features/users/components/nav-projects";
import { UserBadgeMenu } from "@/features/users/components/user-badge-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BuildingIcon, HomeIcon, type LucideIcon } from "lucide-react";

const items: {
  title: string;
  url: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    title: "Ver compañias",
    url: "/dashboard/companies",
    icon: BuildingIcon,
  },
];
export const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <UserBadgeMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn("font-medium", {
                      "text-primary": location.pathname === item.url,
                    })}
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            Mis compañias
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <NavCompanies location={location.pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            Mis proyectos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <NavProjects location={location.pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
