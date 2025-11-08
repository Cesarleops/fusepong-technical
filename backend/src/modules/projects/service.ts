import { NewUserStory } from "../user-stories/types.js";
import { ProjectRepository } from "./repository.js";

export class ProjectService {
  static async getProjectById(id: string) {
    try {
      if (!id) throw new Error("ID IS REQUIRED");
      const project = await ProjectRepository.findById(id);
      return project;
    } catch (e) {
      throw e;
    }
  }

  static async createProjectUserStory(data: NewUserStory) {
    try {
      const result = await ProjectRepository.createProjectUserStory(data);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
