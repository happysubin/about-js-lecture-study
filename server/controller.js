import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "bob",
    username: "bob",
    url: "https://www.shutterstock.com/ko/image-photo/closeup-photo-amazing-short-hairdo-lady-1617540484",
  },
  {
    id: "2",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "su",
    username: "su",
    url: "https://www.shutterstock.com/ko/image-photo/closeup-photo-amazing-short-hairdo-lady-1617540484",
  },
  {
    id: "3",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "bean",
    username: "bean",
    url: "https://www.shutterstock.com/ko/image-photo/closeup-photo-amazing-short-hairdo-lady-1617540484",
  },
];

export const allTweet = (req, res) => {
  const username = req.query.username; //tweet?username=bob
  const data = username
    ? tweets.filter((t) => t.username === username)
    : //query 에 username 이 존재할 경우 tweet 전체를 살펴서 username이 같은것만 가져온다.
      tweets;
  // 없다면 그냥 전체 트윗을 보여준다.
  return res.status(200).json(data);
};

export const oneTweet = (req, res) => {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: `Tweet id ${id} not found` });
  }
};

export const postTweet = (req, res) => {
  const { username, name, text } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text: text,
    createdAt: new Date(),
    name: name,
    username: username,
    url: "https://www.shutterstock.com/ko/image-photo/closeup-photo-amazing-short-hairdo-lady-1617540484",
  };
  tweets.push(tweet);
  res.status(201).json(tweet);
};

export const deleteTweet = (req, res) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  console.log(tweets);
  return res.sendStatus(204);
};

export const putTweet = (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: `Tweet id ${id} not found` });
  }
};

//filter 는 조건을 통과한 요소들로 새로운 배열을 만든다
//find 는 조건에 맞는 배열의 요소를 찾는다.
//forEach 는 주어진함수를 배열의 요소에게 각각 실행
//map 는 각각의 요소에 함수를 적용해 새로운 배열을 만든다.
