import * as recommendationDataFactory from "../factories/recommendationFactory";
import { prisma } from "../../src/database";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});
afterAll(() => {
  prisma.$disconnect();
});
async function createRecommendation() {
  const data = recommendationDataFactory.newRecommendation();
  await supertest(app).post("/recommendations").send(data);

  return data;
}

describe("Test  POST /reomendations", () => {
  it("Create a new recomendation", async () => {
    const recommendationData = recommendationDataFactory.newRecommendation();

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
    const recommendationData = await createRecommendation();

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });

    const result = await supertest(app).post(
      `/recommendations/${createdRecommendation.id}/upvote`
    );

    expect(result.status).toBe(200);
  });
  it("Downvote in recomendation", async () => {
    const recommendationData = await createRecommendation();

    await supertest(app).post("/recommendations").send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });

    const result = await supertest(app).post(
      `/recommendations/${createdRecommendation.id}/downvote`
    );

    expect(result.status).toBe(200);
  });
  it("Upvote/downvote to not exist recommendation", async () => {
    const notExistId = 0;

    const upvoteResult = await supertest(app).post(
      `/recommendations/${notExistId}/upvote`
    );

    const downvoteResult = await supertest(app).post(
      `/recommendations/${notExistId}/downvote`
    );

    expect(upvoteResult.status).toBe(404);
    expect(downvoteResult.status).toBe(404);
  });
});
