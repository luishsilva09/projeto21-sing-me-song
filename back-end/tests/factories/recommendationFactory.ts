import { faker } from "@faker-js/faker";

export function recommendationData() {
  const data = {
    name: faker.lorem.words(2),
    youtubeLink: "https://www.youtube.com/watch?v=rUxyKA_-grg",
  };
  return data;
}
