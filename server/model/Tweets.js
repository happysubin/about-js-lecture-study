import * as userRepositories from "./User";

let tweets = [];

export async function getAllTweets() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepositories.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllTweetsByUsername(username) {
  return getAllTweets.then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getTweetById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepositories.findById(found.userId);
  return { ...found, username, name, url };
  //사용자의 정보를 묶어서 준다
}

export function createTweet(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text: text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getTweetById(tweet.id);
}

export function updateTweet(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) tweet.text = text;
  return getTweetById(tweet.id);
}

export function removeTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
