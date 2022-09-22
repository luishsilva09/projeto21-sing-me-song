import * as recommendationDataFactory from "./factories/recommendationFactory";
import { prisma } from "../../src/database";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});
afterAll(() => {
  prisma.$disconnect();
});

describe("Test  POST /reomendations", () => {
  it("Create a new recomendation", async () => {
    const recommendationData = recommendationDataFactory.recommendationData();

    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });
    expect(result.status).toBe(201);
    expect(createdRecommendation).not.toBe(null);
  });

  it("Upvote in recomendation", async () => {
    const recommendationData = recommendationDataFactory.recommendationData();

    await supertest(app).post("/recommendations").send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });

    const result = await supertest(app).post(
      `/recommendations/${createdRecommendation.id}/upvote`
    );

    expect(result.status).toBe(200);
  });
  it("Downvote in recomendation", async () => {
    const recommendationData = recommendationDataFactory.recommendationData();

    await supertest(app).post("/recommendations").send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });

    const result = await supertest(app).post(
      `/recommendations/${createdRecommendation.id}/downvote`
    );

    expect(result.status).toBe(200);
  });
});
