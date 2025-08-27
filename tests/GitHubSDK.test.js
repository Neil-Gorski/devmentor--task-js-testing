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

describe("GitHubSDK - fetch repos data", () => {
  test("get list of my repos", async () => {
    const gh = new GitHubSDK("Neil-Gorski", TOKEN);
    const myRepos = await gh.getListOfMyRepos();

    expect(Array.isArray(myRepos)).toBe(true);
    expect(myRepos.length).toBeGreaterThan(0);
  });
});
