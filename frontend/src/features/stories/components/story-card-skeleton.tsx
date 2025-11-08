import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const UserStoryCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 p-0">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        <div className="shrink-0">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="flex justify-end p-0 pt-2">
        <Button variant={"ghost"} disabled>
          <Skeleton className="h-4 w-16" />
        </Button>
      </div>
    </div>
  );
};
