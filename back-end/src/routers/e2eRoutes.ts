import { Router } from "express";
import { testController } from "../controllers/e2eController.js";

const testRouter = Router();

testRouter.post("/reset-database", testController.resetDatabase);
testRouter.post("/seed/recommendations", testController.seedDatabase);

export default testRouter;
