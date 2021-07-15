export default class httpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
      // headers를 header 이라고 써서 계속 오류가 나고 있엇따.
    });
    let data;
    console.log(res, "d");

    try {
      data = await res.json();
      console.log(data, "d");
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
