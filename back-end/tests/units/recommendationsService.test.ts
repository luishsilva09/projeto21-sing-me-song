import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import {
  newRecommendation,
  recommendationData,
} from "../factories/recommendationFactory";

describe("Service unit test", () => {
  it("Insert new recommendation", async () => {
    const data = newRecommendation();

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
    const data = newRecommendation();
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
  it("Upvote to a recommendation", async () => {
    const data = recommendationData();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return data;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(data.id);

    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Downvote to a recommendation", async () => {
    const data = recommendationData();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return data;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return data;
      });
    await recommendationService.downvote(data.id);

    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it.todo("Get recommendation by id");
  it.todo("Get all recommendations");
  it.todo("Get top recommendations");
  it.todo("Get a random recommedation");
  it.todo("Filter by score");
});
