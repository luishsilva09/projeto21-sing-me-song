import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();
const API_URL = process.env.API_URL;
console.log(API_URL);

beforeEach(async () => {
  await cy.resetDatabase();
});

Cypress.Commands.add("seedDatabase", () => {
  cy.request("POST", `http://localhost:4000/seed/recommendations`);
});
Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", `http://localhost:4000/reset-database`);
});
describe("POST recommendations", () => {
  it("Create new recommendation", () => {
    const youtubeLink =
      "https://www.youtube.com/watch?v=uc0AD9zUSW8&ab_channel=TONY%27SRELAXATION%28LoFi%26CHILL%29";
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="name"]').type(faker.lorem.word(2));
    cy.get('[ data-cy="youtubeLink"]').type(youtubeLink);

    cy.intercept("POST", "http://localhost:4000/recommendations").as("send");

    cy.get('[ data-cy="submit"]').click();

    cy.wait("@send");
  });
  it("Upvote to a recommendation", () => {
    cy.visit("http://localhost:3000");
    cy.seedDatabase();
  });
});
