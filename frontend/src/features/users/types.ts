import type { Company } from "../companies/types";
import type { Project } from "../projects/types";
import type { Ticket } from "../tickets/types";

export interface UserProjects {
  projects: Project;
}

export interface UserCompanies {
  companies: Company;
}

export interface UserTickets {
  tickets: Ticket;
}
