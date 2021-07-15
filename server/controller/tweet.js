import "express-async-errors";
import * as TweetRepositories from "../model/Tweets";

export const allTweet = async (req, res) => {
  const username = req.query.username; //tweet?username=bob
  const data = await (username
    ? TweetRepositories.getAllTweetsByUsername(username)
    : //query 에 username 이 존재할 경우 tweet 전체를 살펴서 username이 같은것만 가져온다.
      TweetRepositories.getAllTweets());
  // 없다면 그냥 전체 트윗을 보여준다.
  return res.status(200).json(data);
};

export const oneTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await TweetRepositories.getTweetById(id);
  if (tweet) {
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: `Tweet id ${id} not found` });
  }
};

export const postTweet = async (req, res) => {
  const { text } = req.body;
  const tweet = await TweetRepositories.createTweet(text, req.userId);
  res.status(201).json(tweet);
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = TweetRepositories.getTweetById(id);
  if (!tweet) return res.sendStatus(404);
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await TweetRepositories.removeTweet(id);
  return res.sendStatus(204);
};

export const putTweet = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = TweetRepositories.getTweetById(id); //업데이트 전에 해당 id를 가진 트윗을 찾는다
  if (!tweet) return res.sendStatus(404); //해당 id를 가진 트윗이 없으면 실패
  if (tweet.userId !== req.userId) {
    //해당 트윗이 가진 유저아이디와 req에 담긴 유저아이디가 다르면 올리고 로그인한 유저가 다르므로 실패
    return res.sendStatus(403);
  }
  const updated = await TweetRepositories.updateTweet(id, text);
  return res.status(200).json(updated);
};

//filter 는 조건을 통과한 요소들로 새로운 배열을 만든다
//find 는 조건에 맞는 배열의 요소를 찾는다.
//forEach 는 주어진함수를 배열의 요소에게 각각 실행
//map 는 각각의 요소에 함수를 적용해 새로운 배열을 만든다.
