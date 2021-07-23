import { db, sequelize } from "../db/database";
import SQ from "sequelize";

const DataTypes = SQ.DataTypes;

//자동으로 s 가붙어 users 라는 table 이 만들어진다. 스키마를 정의, 데이터 타입을 하나하나 정의해준다
export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false } // 이 설정을 통해 table 생성시 timestamp 값이 같이 생성되지 않는다
);

//자동으로 users라는 table이 생겨있는걸 gui나 콘솔환경에서 확인 가능!!!!

export async function findByUsername(username) {
  return User.findOne({ where: { username } }); //username을 이용해 db안에서 찾은값을 return
  /*
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      console.log("username", result[0][0]); //여기를 통해 진작에 username이 존재하는지 안하는 지 체크가능!
      return result[0][0]; //그래서 undefined 를 return
    });
  //모든 필드를 선택. 그러나 조건이 있어 조건은 바로 인자로 들어온 username과 db 컬럼 username이 동일!*/
}

export async function creatUser(user) {
  const newUser = await User.create(user);
  console.log(newUser.dataValues.id);
  return newUser.dataValues.id;
  /*
  const { username, password, email, name, url } = user;
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0].insertId;
    });
  //쿼리문을 전달한다. 넣을 만큼 괄호에 물음표를 쓰고 물음표에 해당하는 변수값을 2번째 인자에 배열로 넣는다
  //id는 자동으로 생성됨 db 내부에서*/
}

export async function findById(id) {
  return User.findByPk(id); //findBy primary key 메소드이다
  /*
  return db.execute("SELECT * FROM users WHERE id=?", [id]).then((result) => {
    console.log("id", result);
    return result[0][0];
  });*/
}
