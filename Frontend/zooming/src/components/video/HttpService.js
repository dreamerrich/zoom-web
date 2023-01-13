const p = (response) => response.json();

export class Http {
  constructor(baseUri, headers = { "Content-Type": "application/json" }) {
    this.baseUri = baseUri;
    this.headers = headers;
  }
  get(urlPart) {
    const url = `${this.baseUri}/${urlPart}`;
    console.log("esta es la url", url);
    return fetch(url).then(p);
  }

  post(urlPart, params) {
    const url = `${this.baseUri}/${urlPart}`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: this.headers
    }).then(p);
  }

  put(urlPart, params) {
    const url = `${this.baseUri}/${urlPart}`;
    return fetch(url, {
      method: "PUT",
      body: params,
      headers: this.headers
    }).then(p);
  }

  delete(urlPart) {
    const url = `${this.baseUri}/${urlPart}`;
    return fetch(url, {
      method: "DELETE",
      headers: this.headers
    }).then(p);
  }
}