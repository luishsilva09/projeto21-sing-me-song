import { prisma } from "../../src/database";
import * as recommendationDataFactory from "./factories/recommendationFactory";
import { Recommendation } from "@prisma/client";

import supertest from "supertest";
import app from "../../src/app";

describe("test GET /recommendations", () => {
  it("Get last 10 recommendations", async () => {
    const result = await supertest(app).get("/recommendations");
    const maxLength = 10;

    const comapareLength = result.body.length <= maxLength;

    expect(result.body).toBeInstanceOf(Array);
    expect(comapareLength).toBe(true);
  });
  it("Get recommendation by id", async () => {
    const recommendationData = recommendationDataFactory.recommendationData();
    await supertest(app).post("/recommendations").send(recommendationData);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendationData.name },
    });
    const result = await supertest(app).get(
      `/recommendations/${createdRecommendation.id}`
    );

    expect(result.body).toMatchObject(createdRecommendation);
  });
  it("Get random recommendation", async () => {});
  it("Get recommendations by amount", async () => {
    const recommendationData = recommendationDataFactory.recommendationData();
    const expectedLength = 1;
    const amount = 1;
    await supertest(app).post("/recommendations").send(recommendationData);

    const result = await supertest(app).get(`/recommendations/top/${amount}`);

    expect(result.body.length).toBe(expectedLength);
  });
});
