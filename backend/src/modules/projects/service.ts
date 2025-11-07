import { ProjectRepository } from "./repository.js";
import { NewProject } from "./types.js";

export class ProjectService {
  static async getAllProjects() {
    try {
      const projects = await ProjectRepository.findAll();
      return projects;
    } catch (e) {
      throw e;
    }
  }

  static async getProjectById(id: string) {
    try {
      if (!id) throw new Error("ID IS REQUIRED");
      const project = await ProjectRepository.findById(id);
      return project;
    } catch (e) {
      throw e;
    }
  }

  static async create(data: NewProject) {
    try {
      await ProjectRepository.create(data);
    } catch (e) {
      throw e;
    }
  }
}
