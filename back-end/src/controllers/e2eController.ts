import { Request, Response } from "express";
import * as e2eService from "../services/e2eService.js";

async function resetDatabase(req: Request, res: Response) {
  await e2eService.resetDatabase();
  res.status(200).send();
}

async function seedDatabase(req: Request, res: Response) {
  await e2eService.seedDatabase();
  res.status(201).send();
}

export const testController = {
  resetDatabase,
  seedDatabase,
};
