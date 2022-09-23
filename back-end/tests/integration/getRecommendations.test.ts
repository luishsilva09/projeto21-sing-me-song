import { prisma } from "../../src/database";
import * as recommendationDataFactory from "../factories/recommendationFactory";
import { Recommendation } from "@prisma/client";

import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});
afterAll(() => {
  prisma.$disconnect();
});

async function createRecommendation() {
  const data = recommendationDataFactory.recommendationData();
  await supertest(app).post("/recommendations").send(data);

  return data;
}
describe("test GET /recommendations", () => {
  it("Get last 10 recommendations", async () => {
    const result = await supertest(app).get("/recommendations");
    const maxLength = 10;

    const comapareLength = result.body.length <= maxLength;

    expect(result.body).toBeInstanceOf(Array);
    expect(comapareLength).toBe(true);
  });
  it("Get recommendation by id", async () => {
    const recommendationData = await createRecommendation();

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });
    const result = await supertest(app).get(
      `/recommendations/${createdRecommendation.id}`
    );

    expect(result.body).toMatchObject(createdRecommendation);
  });
  it("Get random recommendation", async () => {
    const recommendationData = await createRecommendation();

    const result = await supertest(app).get("/recommendations/random");

    expect(result.body).toMatchObject<Recommendation>(result.body);
  });
  it("Get recommendations by amount", async () => {
    const recommendationData = await createRecommendation();
    const expectedLength = 1;
    const amount = 1;

    const result = await supertest(app).get(`/recommendations/top/${amount}`);

    expect(result.body.length).toBe(expectedLength);
  });
});
