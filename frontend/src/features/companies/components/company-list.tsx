import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useGetCompanies } from "../api/get-companies";
import { CompanyCard } from "./company-card";
import { CompanyCardSkeleton } from "./company-card-skeleton";
import { ThumbsUpIcon } from "lucide-react";

export const CompanyList = () => {
  const { data, error, isLoading } = useGetCompanies();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <CompanyCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return <div>something bad happened</div>;
  }

  if (!data || data.length === 0) {
    return (
      <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ThumbsUpIcon className="stroke-green-500" />
          </EmptyMedia>
          <EmptyTitle>Ya eres parte de todas las compañias!</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {data?.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
