import mysql from "mysql2";
import { config } from "../config";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
}); //이 메소드를 통해 mysql과 접속 mysql 설정관련 객체 전달

export const db = pool.promise();
//비동기니까 프로미스로 export !!!
