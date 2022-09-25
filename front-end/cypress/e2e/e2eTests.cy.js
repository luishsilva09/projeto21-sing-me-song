import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

Cypress.env(process.env.API_URL);

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

    cy.wait("@send").then(({ request, response }) => {
      expect(response.statusCode).equal(201);
    });
  });
  // it("Upvote to a recommendation", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.seedDatabase();

  //   cy.get('[data-cy="upvote"]').click();
  // });
  // it("Upvote to a recommendation", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.seedDatabase();

  //   cy.get('[data-cy="downvote"]').click();
  // });

  it("Get top recommendations", () => {
    cy.visit("http://localhost:3000/top");
    cy.seedDatabase();

    cy.intercept("GET", `http://localhost:4000/recommendations/top/10`).as(
      "promise"
    );

    cy.wait("@promise").then(({ request, response }) => {
      expect(response.body).to.not.equal(null);
    });
  });
  it("Nvigate top", () => {
    cy.visit("http://localhost:3000");

    cy.get('[ data-cy="top"]').click();

    cy.url().should("equal", `http://localhost:3000/top`);
  });
  it("Nvigate home", () => {
    cy.visit("http://localhost:3000/top");

    cy.get('[ data-cy="home"]').click();

    cy.url().should("equal", `http://localhost:3000/`);
  });
  it("Nvigate random", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[ data-cy="random"]').click();

    cy.url().should("equal", `http://localhost:3000/random`);
  });
});
