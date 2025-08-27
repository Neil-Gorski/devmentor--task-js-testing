import GitHubSDK from "../src/GitHubSDK";

describe("GitHubSDK - constructor", () => {
  test("stores owner, token and baseURL", () => {
    const gh = new GitHubSDK("Neil-Gorski", "secret-token");

    expect(gh.owner).toBe("Neil-Gorski");
    expect(gh.token).toBe("secret-token");
    expect(gh.baseURL).toBe("https://api.github.com");
  });
});

describe("GitHubSDK - fetch repos data", () => {
  test("get list of my repos", async () => {
    const gh = new GitHubSDK("Neil-Gorski", "secret-token");
    const myRepos = await gh.getListOfMyRepos();

    expect(Array.isArray(myRepos)).toBe(true);
    expect(myRepos.length).toBeGreaterThan(0);
  });
});
