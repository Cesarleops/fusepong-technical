import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="flex flex-col h-dvh w-screen bg-[#F9FDFE]">
    <header className="p-3">
      <h1 className="text-primary font-semibold text-xl">Obito</h1>
    </header>
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
