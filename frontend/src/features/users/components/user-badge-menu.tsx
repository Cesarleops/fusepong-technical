import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { PizzaIcon } from "lucide-react";

export const UserBadgeMenu = () => {
  const { data, isPending } = useSession();
  return (
    <SidebarMenu className="border border-slate-200 rounded-lg">
      <SidebarMenuItem>
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
                <span className="font-medium truncate capitalize">
                  {data?.user.name}
                </span>
              )}
            </div>

            <span className="font-normal text-primary">Buen día</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
