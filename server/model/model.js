import "express-async-errors";

export let tweets = [
  {
    id: "1",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "bob",
    username: "bob",
    url: "",
  },
  {
    id: "2",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "su",
    username: "su",
    url: "",
  },
  {
    id: "3",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "bean",
    username: "bean",
    url: "",
  },
];

export function getAllTweets() {
  return tweets;
}

export function getAllTweetsByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export function getTweetById(id) {
  return tweets.find((t) => t.id === id);
}

export function createTweet(username, name, text) {
  const tweet = {
    id: Date.now().toString(),
    text: text,
    createdAt: new Date(),
    name,
    username,
    url: "",
  };
  tweets.push(tweet);
  return tweet;
}

export function updateTweet(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) tweet.text = text;
  return tweet;
}

export function removeTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
