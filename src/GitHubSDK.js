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
      headers: this.headers,
    };
    const response = await fetch(url, fetchObj);
    const data = await response.json();
    return data;
  }

  async createRepo(payload) {
    const url = `${this.baseURL}/user/repos`;
    const fetchObj = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, fetchObj);
    const data = await response.json();
    console.log(response);
    const returnObj = {
      status: response.status,
      error:
        response.status === 201
          ? null
          : "Error: Repo with this name allready exists.",
      data: data,
    };

    return returnObj;
  }

  async deleteRepo(repoName) {
    const url = `${this.baseURL}/repos/${this.owner}/${repoName}`;
    const fetchObj = {
      method: "DELETE",
      headers: this.headers,
    };
    const response = await fetch(url, fetchObj);
    console.log(response);
    const returnObj = {
      status: response.status,
      error:
        response.status === 204
          ? null
          : "Error: Can not delete non existing repo.",
      data: null,
    };

    return returnObj;
  }

  async getRepo(repo) {
    const url = `${this.baseURL}/repos/${this.owner}/${repo}`;
    const fetchObj = {
      method: "GET",
      headers: this.headers,
    };
    const response = await fetch(url, fetchObj);
    const data = await response.json();
    const returnObj = {
      status: response.status,
      error:
        response.status === 200
          ? null
          : "Error: Can not find non existing repo.",
      data: response.status === 200 ? data : null,
    };
    return returnObj;
  }

  async updateRepo(repo, payload) {
    const url = `${this.baseURL}/repos/${this.owner}/${repo}`;
    const fetchObj = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, fetchObj);
    const data = response.status === 200 ? await response.json() : null;
    const returnObj = {
      status: response.status,
      error:
        response.status === 200
          ? null
          : "Error: Can not find non existing repo.",
      data: response.status === 200 ? data : null,
    };
    return returnObj;
  }
}
