import { UserStoryRepository } from "./repository.js";
import { NewUserStory } from "./types.js";

export class UserStoryService {
  static async create(data: NewUserStory) {
    try {
      await UserStoryRepository.create(data);
    } catch (e) {
      throw e;
    }
  }
}
