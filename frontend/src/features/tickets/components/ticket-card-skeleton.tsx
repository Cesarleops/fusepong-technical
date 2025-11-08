import { Skeleton } from "@/components/ui/skeleton";

export const TicketCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex-1 min-w-0 flex flex-col gap-3 p-0">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <header className="w-full flex justify-between items-center">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </header>

        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />

        <footer className="mt-4">
          <Skeleton className="h-8 w-full rounded-md" />
        </footer>
      </div>
    </div>
  );
};
