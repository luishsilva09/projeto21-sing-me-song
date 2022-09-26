import { faker } from "@faker-js/faker";

const API_URL = Cypress.env("API_URL");
const FRONT_URL = Cypress.env("FRONT_URL");

beforeEach(async () => {
  await cy.resetDatabase();
});

Cypress.Commands.add("seedDatabase", () => {
  cy.request("POST", `${API_URL}/seed/recommendations`);
});
Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", `${API_URL}/reset-database`);
});
describe("POST recommendations", () => {
  it("Create new recommendation", () => {
    const youtubeLink =
      "https://www.youtube.com/watch?v=uc0AD9zUSW8&ab_channel=TONY%27SRELAXATION%28LoFi%26CHILL%29";
    cy.visit(`${FRONT_URL}/`);
    cy.get('[data-cy="name"]').type(faker.lorem.word(2));
    cy.get('[ data-cy="youtubeLink"]').type(youtubeLink);

    cy.intercept("POST", `${API_URL}/recommendations`).as("send");

    cy.get('[ data-cy="submit"]').click();

    cy.wait("@send").then(({ request, response }) => {
      expect(response.statusCode).equal(201);
    });
  });
  it("Upvote to a recommendation", () => {
    cy.visit(`${FRONT_URL}`);
    cy.seedDatabase();

    cy.get('[data-cy="upvote"]').click();

    cy.get('[data-cy="scoreValue"]')
      .invoke("text")
      .then(($value) => {
        expect($value).equal("1");
      });
  });
  it("Downvote to a recommendation", () => {
    cy.visit(`${FRONT_URL}`);
    cy.seedDatabase();

    cy.get('[data-cy="downvote"]').click();

    cy.get('[data-cy="scoreValue"]')
      .invoke("text")
      .then(($value) => {
        expect($value).equal("-1");
      });
  });

  it("Get top recommendations", () => {
    cy.visit(`${FRONT_URL}/top`);
    cy.seedDatabase();

    cy.intercept("GET", `${API_URL}/recommendations/top/10`).as("promise");

    cy.wait("@promise").then(({ request, response }) => {
      expect(response.body).to.not.equal(null);
    });
  });

  it("Navigate to top", () => {
    cy.visit(`${FRONT_URL}/`);

    cy.get('[ data-cy="top"]').click();

    cy.url().should("equal", `${FRONT_URL}/top`);
  });
  it("Navigate to home", () => {
    cy.visit(`${FRONT_URL}/top`);

    cy.get('[ data-cy="home"]').click();

    cy.url().should("equal", `${FRONT_URL}/`);
  });
  it("Navigate to random", () => {
    cy.visit(`${FRONT_URL}/`);

    cy.get('[ data-cy="random"]').click();

    cy.url().should("equal", `${FRONT_URL}/random`);
  });
});
