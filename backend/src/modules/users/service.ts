import { UserRepository } from "./repository.js";

export class UserService {
  static async getProjects(userId: string) {
    try {
      const projects = UserRepository.findProjects(userId);
      return projects;
    } catch (e) {
      throw e;
    }
  }

  static async getCompanies(userId: string) {
    try {
      const companies = UserRepository.findCompanies(userId);
      return companies;
    } catch (e) {
      throw e;
    }
  }

  static async getTickets(userId: string) {
    try {
      const result = UserRepository.findTickets(userId);
      return result;
    } catch (e) {}
  }

  static async joinCompany(userId: string, companyId: string) {
    console.log("userid", userId);
    try {
      await UserRepository.joinCompany(userId, companyId);
    } catch (e) {
      throw e;
    }
  }

  static async joinProject(userId: string, projectId: string) {
    try {
      await UserRepository.joinProject(userId, projectId);
    } catch (e) {
      throw e;
    }
  }
}
