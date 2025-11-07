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
      await ProjectRepository.createProjectUserStory(data);
    } catch (e) {
      throw e;
    }
  }
}
