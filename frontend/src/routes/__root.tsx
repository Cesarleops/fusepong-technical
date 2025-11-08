import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="flex flex-col w-screen bg-[#F9FDFE]">
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
