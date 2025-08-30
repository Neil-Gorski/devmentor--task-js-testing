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
    repos = await gh.getListOfMyRepos();
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
});
