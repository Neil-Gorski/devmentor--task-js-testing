export default class GitHubSDK {
  constructor(owner, token) {
    this.owner = owner;
    this.token = token;
    this.baseURL = "https://api.github.com";
  }
}
