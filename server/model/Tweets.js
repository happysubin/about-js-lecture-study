import { db } from "../db/database";
import * as userRepositories from "./User";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.userId, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";

export async function getAllTweets() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllTweetsByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getTweetById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=? ${ORDER_DESC}`, [id])
    .then((result) => result[0]);
}

export function createTweet(text, userId) {
  return db
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?) ", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getTweetById(result[0].insertId));
}

export function updateTweet(id, text) {
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getTweetById(id));
}

export function removeTweet(id) {
  return db.execute("DELET FROM tweets where id=?", [id]);
}
