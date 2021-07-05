export default class httpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.header },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }
    if (res.status > 299 || res.status < 200) {
      //2oo대가 아니면 에러를 던진다
      const message =
        data && data.message ? data.message : "Something went wrong!";
      throw new Error(message);
    }
    return data;
  }
}
