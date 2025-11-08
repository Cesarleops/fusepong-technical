import { Link } from "@tanstack/react-router";
import type { Company } from "../types";
import { Button } from "@/components/ui/button";

interface Props {
  company: Company;
}
export const CompanyCard = ({ company }: Props) => {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{company.name}</h3>
        <span className="text-xs font-medium text-gray-500">{company.nit}</span>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-gray-600 truncate">{company.email}</p>
        <p className="text-gray-600 truncate">{company.phone}</p>
        <p className="text-gray-600 truncate">{company.address}</p>
      </div>
      <footer className="w-full flex justify-end">
        <Link to={`/dashboard/${company.id}/projects/all`}>
          <Button>Ver proyectos</Button>
        </Link>
      </footer>
    </article>
  );
};
