import { faker } from "@faker-js/faker";

export function newRecommendation() {
  const data = {
    name: faker.lorem.words(2),
    youtubeLink: "https://www.youtube.com/watch?v=rUxyKA_-grg",
  };
  return data;
}

export function recommendationData() {
  const data = {
    id: 1,
    name: faker.lorem.words(2),
    youtubeLink: "https://www.youtube.com/watch?v=rUxyKA_-grg",
    score: Math.floor(Math.random() * 200),
  };
  return data;
}
