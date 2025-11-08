import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CompanyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <header className="flex flex-row items-center justify-between p-0">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-12" />
      </header>

      <div className="flex flex-col gap-2 text-sm p-0">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>

      <div className="flex justify-end p-0 pt-2">
        <Button variant={"ghost"} disabled>
          <Skeleton className="h-4 w-12" />
        </Button>
      </div>
    </div>
  );
};
