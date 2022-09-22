import * as recomandationFactory from "./factories/recommendationFactory";
import { prisma } from "../../src/database";
import supertest from "supertest";
import app from "../../src/app";

describe("Test  POST /reomendations", () => {
  it("Create a new recomendation", async () => {
    const recommendationData = recomandationFactory.recommendationData();

    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });
    expect(result.status).toBe(201);
    expect(createdRecommendation).not.toBe(null);
  });

  it.todo("Upvote in recomendation");
  it.todo("Dowvote in recomendation");
});
