import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationData } from "../factories/recommendationFactory";

describe("Service unit test", () => {
  it("Insert new recommendation", async () => {
    const data = recommendationData();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(data);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });
  it("Insert with error to create a new recommendation", async () => {
    const data = recommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          name: data.name,
          youtubeLink: data.youtubeLink,
        };
      });
    const promise = recommendationService.insert(data);
    expect(promise).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
  });
  it.todo("Upvote to a recommendation");
  it.todo("Downvote to a recommendation");
  it.todo("Get recommendation by id");
  it.todo("Get all recommendations");
  it.todo("Get top recommendations");
  it.todo("Get a random recommedation");
  it.todo("Filter by score");
});
