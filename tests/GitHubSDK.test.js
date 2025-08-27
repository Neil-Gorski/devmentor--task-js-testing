import GitHubSDK from "../src/GitHubSDK";

describe("GitHubSDK - constructor", () => {
  test("stores owner, token and baseURL", () => {
    const gh = new GitHubSDK("Neil-Gorski", "secret-token");

    expect(gh.owner).toBe("Neil-Gorski");
    expect(gh.token).toBe("secret-token");
    expect(gh.baseURL).toBe("https://api.github.com");
  });
});
