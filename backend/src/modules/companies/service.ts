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

  static async create(data: NewCompany) {
    try {
      await CompanyRepository.create(data);
    } catch (e) {
      throw e;
    }
  }
}
