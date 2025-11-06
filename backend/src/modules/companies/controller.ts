import { Request, Response } from "express";

export async function getCompanies(_req: Request, res: Response) {
  // TODO: add service to read
  res.status(200).send("getting company\n");
}

export function createCompany(_req: Request, res: Response) {
  //TODO: Add service to save
  res.status(200).send("created company\n");
}
