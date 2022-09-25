import { prisma } from "../database.js";

export async function resetDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}
export async function seedDatabase(dataRecommendation: {
  name: string;
  youtubeLink: string;
}) {
  await prisma.recommendation.create({ data: dataRecommendation });
}
