import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard")({
  component: AppLayout,
  beforeLoad: async ({ location }) => {
    //Prevent unauthenticated users to see dashboard routes
    const { data } = await authClient.getSession();
    if (!data) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AppLayout() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </div>
  );
}
