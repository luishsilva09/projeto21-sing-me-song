import { prisma } from "../../src/database";
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
  it.todo("Get recommendation by id");
  it.todo("Get random recommendation");
  it.todo("Get recommendations by amount");
});
