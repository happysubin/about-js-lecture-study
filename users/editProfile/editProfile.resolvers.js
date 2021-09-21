import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolvers } from "../users.utils";

const resolverFunction = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  // 우리의 토큰을 해독하는 역할을 함. 그럼 우리가 sing 메소드를 사용할때 썼던 유저 아이디가 나온다.
  console.log("avatar", avatar);
  console.log("loggedINUSER", loggedInUser);

  const { filename, createReadStream } = await avatar; //파일 종류 이름 ,createReadStream, encoding 프로퍼티가 있다.
  console.log(filename, createReadStream);
  const readStream = createReadStream();
  const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename); //업로드에다가 보내버림 process.cwd는 작업하는 우리 디렉토리다.
  //폴더에다가 스트림을 쓴다
  readStream.pipe(writeStream); //연결을 시켜준다

  let hashPassword = null;
  if (newPassword) {
    hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updateUser = await client.user.update({
    where: { id: loggedInUser.id }, //토큰에서 가져온 아이디로 업데이트 한다
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(hashPassword && { password: hashPassword }),
      //문법 설명 앞에 조건이 트루이면 뒤에 오브젝트를 리턴. 그러면 ...연산자를 이용해 오브젝트 내부의 값들이 다나온다.
      //앞에 해쉬화된 비번이  null이 아니라면 뒤에 오브젝트를
    },
  });
  if (updateUser) {
    return { ok: true };
  } else {
    return { ok: false, error: "Could not update profile." };
  }
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolvers(resolverFunction),
  },
};
//undefined를 업데이트하라면 어떡하지?
//prisma는 undefined값을 보내면 update하지 않는다.
//함수를 리턴하는 함수
