import { NewTicket } from "../tickets/types.js";
import { UserStoryRepository } from "./repository.js";

export class UserStoryService {
  static async getUserStoryById(storyId: string) {
    try {
      const story = await UserStoryRepository.findById(storyId);
      return story;
    } catch (e) {
      throw e;
    }
  }
  static async createUserStoryTicket(data: NewTicket) {
    try {
      await UserStoryRepository.createUserStoryTicket(data);
    } catch (e) {
      throw e;
    }
  }
}
