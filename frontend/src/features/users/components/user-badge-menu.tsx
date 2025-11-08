import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { useSession } from "@/lib/auth-client";
import { ChevronsUpDownIcon, PizzaIcon } from "lucide-react";

export const UserBadgeMenu = () => {
  const { data, isPending } = useSession();
  return (
    <SidebarMenu className="border border-slate-200 rounded-lg">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="border border-slate-200  text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
                <PizzaIcon className="stroke-primary" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none h-8">
                <div className="size-4">
                  {isPending ? (
                    <Skeleton className="size-4 rounded-md" />
                  ) : (
                    <span className="font-medium">{data?.user.name}</span>
                  )}
                </div>

                <span>Buen dia</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuItem>
              <SignOutButton className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
