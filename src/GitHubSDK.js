export default class GitHubSDK {
  constructor(owner, token) {
    this.owner = owner;
    this.token = token;
    this.baseURL = "https://api.github.com";
    this.headers = {
      accept: "application/vnd.github+json",
      Authorization: `Bearer ${this.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  async getListOfRepos(owner = this.owner) {
    const url = `${this.baseURL}/users/${owner}/repos?per_page=100`;
    console.log(url);
    const fetchObj = {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };
    const res = await fetch(url, fetchObj);
    const data = await res.json();
    return data;
  }

  async createRepo(payload) {
    const url = `${this.baseURL}/user/repos`;
    const fetchObj = {
      method: "POST",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, fetchObj);
    const data = await response.json();
    console.log(response);
    returnObj = {
      status: response.status,
      error:
        response.status === 200
          ? null
          : "Error: Repo with this name allready exists.",
      data: data,
    };

    return returnObj;
  }
}
