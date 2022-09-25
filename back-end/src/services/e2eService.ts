import * as e2eRepository from "../repositories/e2eRespository.js";
import { faker } from "@faker-js/faker";

export async function resetDatabase() {
  await e2eRepository.resetDatabase();
}
export async function seedDatabase() {
  const data = {
    name: faker.lorem.words(2),
    youtubeLink:
      "https://www.youtube.com/watch?v=uc0AD9zUSW8&ab_channel=TONY%27SRELAXATION%28LoFi%26CHILL%29",
  };

  await e2eRepository.seedDatabase(data);
}
