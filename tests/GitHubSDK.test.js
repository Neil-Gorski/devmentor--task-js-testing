import GitHubSDK from "../src/GitHubSDK";
import { TOKEN } from "../token";

describe("GitHubSDK - constructor", () => {
  test("stores owner, token and baseURL", () => {
    const gh = new GitHubSDK("Neil-Gorski", TOKEN);

    expect(gh.owner).toBe("Neil-Gorski");
    expect(gh.token).toBe(TOKEN);
    expect(gh.baseURL).toBe("https://api.github.com");
  });
});

describe("GitHubSDK - fetch my repos data", () => {
  let gh;
  let repos;
  beforeAll(async () => {
    gh = new GitHubSDK("Neil-Gorski", TOKEN);
    repos = await gh.getListOfRepos();
  });
  test("returns an arry", async () => {
    expect(Array.isArray(repos)).toBe(true);
  });
  test("array is not empty", () => {
    expect(repos.length).toBeGreaterThan(0);
  });
  test("meta data is correct", () => {
    expect(repos[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        node_id: expect.any(String),
        name: expect.any(String),
        owner: expect.objectContaining({
          login: expect.any(String),
        }),
        private: expect.any(Boolean),
        fork: expect.any(Boolean),
      })
    );
  });
  describe("GitHubSDK - fetch devmentor-pl repos data", () => {
    let gh;
    let repos;
    beforeAll(async () => {
      gh = new GitHubSDK("Neil-Gorski", TOKEN);
      repos = await gh.getListOfRepos("devmentor-pl");
    });
    test("returns an arry", async () => {
      expect(Array.isArray(repos)).toBe(true);
    });
    test("array is not empty", () => {
      expect(repos.length).toBeGreaterThan(0);
    });
    test("meta data is correct", () => {
      expect(repos[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          node_id: expect.any(String),
          name: expect.any(String),
          owner: expect.objectContaining({
            login: expect.any(String),
          }),
          private: expect.any(Boolean),
          fork: expect.any(Boolean),
        })
      );
    });
  });
  describe("GitHubSDK - CRUD repo", () => {
    let gh;
    const payload = {
      name: "GitHubSDK - Test repo",
      description:
        "This repository serves as a testing environment for the GitHub REST API. It is used to test and verify the creation of repositories via API calls.",
      private: false,
      visibility: "public",
    };
    beforeAll(async () => {
      gh = new GitHubSDK("Neil-Gorski", TOKEN);
    });
    test("Create a repo", async () => {
      const resp = await gh.createRepo(payload);
      expect(resp.status).toBe(201);
      expect(resp.error).toBe(null);
      expect(resp.data).toEqual(
        expect.objectContaining({
          name: payload.name,
          description: payload.description,
          private: payload.private,
          visibility: payload.visibility,
        })
      );
    });
    test("fails create same repo again", async () => {
      const resp = await gh.createRepo(payload);
      expect(resp.status).toBe(422);
      expect(resp.error).toBe("Error: Repo with this name allready exists.");
    });
    test("find created repo", async () => {
      const resp = await gh.getRepo(payload.name);
      expect(resp.status).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.data).toEqual(
        expect.objectContaining({
          name: payload.name,
          description: payload.description,
          private: payload.private,
          visibility: payload.visibility,
        })
      );
    });
    test("fails to find non existing repo", async () => {
      const resp = await gh.getRepo(payload.name + "unknown");
      expect(resp.status).toBe(404);
      expect(resp.error).toBe(`Error: Can not find non existing repo.`);
      expect(resp.data).toBe(null);
    });
    test("update repo description", async () => {
      payload.description =
        "This repository serves as a testing environment for the GitHub REST API. It is used to test and verify the creation of repositories via API calls. Description has been updated.";
      const resp = await gh.updateRepo(payload.name, payload);
      expect(resp.status).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.data).toEqual(
        expect.objectContaining({
          name: payload.name,
          description: payload.description,
          private: payload.private,
          visibility: payload.visibility,
        })
      );
    });
    test("delete repo", async () => {
      const resp = await gh.deleteRepo(payload.name);
      expect(resp.status).toBe(204);
      expect(resp.error).toBe(null);
      expect(resp.data).toBe(null);
    });
    test("error trying delete non existing repo", async () => {
      const resp = await gh.deleteRepo(payload.name);
      expect(resp.status).toBe(404);
      expect(resp.error).toBe("Error: Can not delete non existing repo.");
      expect(resp.data).toBe(null);
    });
  });
});
