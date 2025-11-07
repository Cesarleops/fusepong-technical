import { db } from "../../db/index.js";
import { companiesTable } from "../../db/schema/public.js";
import { Company, NewCompany } from "./types.js";

export class CompanyRepository {
  static async findAll(): Promise<Company[]> {
    try {
      const result = await db.select().from(companiesTable);
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async create(data: NewCompany) {
    try {
      await db.insert(companiesTable).values(data);
    } catch (e) {
      console.log("e", e);
      throw e;
    }
  }
}
