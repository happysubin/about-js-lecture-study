import crypto from "crypto";

//node js 교과서 125 126

export const createSalt = async () => {
  try {
    return await crypto.randomBytes(64).toString("base64");
  } catch (err) {
    console.log(err);
  }
};

//랜덤으로 64바이트 길이의 문자열을 만든다.

export const createHashPassword = (originPassword) =>
  new Promise(async (resolve, reject) => {
    try {
      const salt = await createSalt();
      //비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘을 인수러 넣는다.
      crypto.pbkdf2(originPassword, salt, 10000, 64, "sha512", (err, key) => {
        if (err) throw err;
        resolve({ hashedPassword: key.toString("base64"), salt });
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

//salt 와 해쉬화된 비밀번호를 반환

export const checkPassword = (salt, originPassword) =>
  new Promise(async (resolve, reject) => {
    try {
      crypto.pbkdf2(originPassword, salt, 10000, 64, "sha512", (err, key) => {
        if (err) throw err;
        resolve(key.toString("base64"));
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

//유저의 salt 와 패스워드를 이용해 패스워드 체크에 사용!

//db에 salt 와 해쉬화된 패스워드를 저장!!!
