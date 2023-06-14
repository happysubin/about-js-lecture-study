import SQ from "sequelize";
import { db } from "../db/database";
import { sequelize } from "../db/database";
import { User } from "./User";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User);
//트윗은 유저에게 포함이된다. 놀랍게 tweets 테이블을 보면 자동으로 userId가 생겼다!!!!
/*
const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.userId, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";
*/
const INCLUDE_USER = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.url"), "url"],
    //이러면 하나의 객체안에 속성 값으로 나온다. 객체안의 객체가 들어있는 정보로 우리가 데이터를 받지 않는다
  ],
  include: { model: User, attributes: [] },
};

const ORDER_DESC = {
  order: [["createdAt", "Desc"]],
};

export async function getAllTweets() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  /*
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
  */
}

export async function getAllTweetsByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
  /*
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);*/
}

export async function getTweetById(id) {
  return Tweet.findOne({ where: { id }, ...INCLUDE_USER });
  /*
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=? ${ORDER_DESC}`, [id])
    .then((result) => result[0]);*/
}

export function createTweet(text, userId) {
  return Tweet.create({ text, userId }).then((data) => {
    console.log(data.dataValues.id);
    return this.getTweetById(data.dataValues.id);
  });
  /*
  return db
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?) ", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getTweetById(result[0].insertId));*/
}

export function updateTweet(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.text = text;
    return tweet.save(); //저장할 자기자신을 promise로 리턴
  });
  /*
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getTweetById(id));*/
}

export function removeTweet(id) {
  return Tweet.findByPk(id).then((tweet) => {
    console.log("destroy");
    tweet.destroy();
  });
}
