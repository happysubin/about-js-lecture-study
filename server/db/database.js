import mysql from "mysql2";
import { config } from "../config";
import SQ from "sequelize";

const { database, host, user, password } = config.db; //config.db라고 쓸 것!!!
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

const pool = mysql.createPool({
  host,
  user,
  database,
  password,
}); //이 메소드를 통해 mysql과 접속 mysql 설정관련 객체 전달

export const db = pool.promise();
//비동기니까 프로미스로 export !!!
