import { NewProject } from "../projects/types.js";
import { CompanyRepository } from "./repository.js";
import { NewCompany } from "./types.js";

export class CompanyService {
  static async getAllCompanies() {
    try {
      const companies = await CompanyRepository.findAll();
      return companies;
    } catch (e) {
      throw e;
    }
  }

  static async getCompanyProjects(companyId: string) {
    try {
      const projects = await CompanyRepository.findCompanyProjects(companyId);
      return projects;
    } catch (e) {
      throw e;
    }
  }

  static async create(data: NewCompany) {
    try {
      await CompanyRepository.create(data);
    } catch (e) {
      throw e;
    }
  }

  static async createCompanyProject(data: NewProject) {
    try {
      await CompanyRepository.createCompanyProject(data);
    } catch (e) {
      throw e;
    }
  }
}
