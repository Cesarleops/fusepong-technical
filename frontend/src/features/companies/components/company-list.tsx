import { useGetCompanies } from "../api/get-companies";
import { CompanyCard } from "./company-card";
import { CompanyCardSkeleton } from "./company-card-skeleton";

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
    return <div>Parece que aún no hay compañias</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {data?.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
