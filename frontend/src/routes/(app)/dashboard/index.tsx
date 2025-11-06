import { AppSidebar } from "@/components/app-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div>
      <AppSidebar />
      <Outlet />
    </div>
  );
}
