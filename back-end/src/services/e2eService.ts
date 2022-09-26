import * as e2eRepository from "../repositories/e2eRespository.js";
import { faker } from "@faker-js/faker";

export async function resetDatabase() {
  await e2eRepository.resetDatabase();
}
export async function seedDatabase() {
  const data = {
    name: faker.lorem.words(2),
    youtubeLink:
      "https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl",
  };

  await e2eRepository.seedDatabase(data);
}
