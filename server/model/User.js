import { db } from "../db/database";

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      console.log("username", result[0][0]); //여기를 통해 진작에 username이 존재하는지 안하는 지 체크가능!
      return result[0][0]; //그래서 undefined 를 return
    });
  //모든 필드를 선택. 그러나 조건이 있어 조건은 바로 인자로 들어온 username과 db 컬럼 username이 동일!
}

export async function creatUser(user) {
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
  //id는 자동으로 생성됨 db 내부에서
}

export async function findById(id) {
  return db.execute("SELECT * FROM users WHERE id=?", [id]).then((result) => {
    console.log("id", result);
    return result[0][0];
  });
}
