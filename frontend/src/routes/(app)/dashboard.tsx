import { AppSidebar } from "@/components/app-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}
