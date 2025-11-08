import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { NavCompanies } from "@/features/users/components/nav-companies";
import { NavProjects } from "@/features/users/components/nav-projects";
import { Link } from "@tanstack/react-router";
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
    title: "Compañias",
    url: "/dashboard/companies",
    icon: BuildingIcon,
  },
];
export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
          <SidebarGroupLabel>Mis compañias</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavCompanies />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Proyectos</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavProjects />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SignOutButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};
