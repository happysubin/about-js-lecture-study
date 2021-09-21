require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

//아폴로 서버도 파일 업로드를 지원. 그러나 사용하려먼 아폴로 서버가 스키마를 생성해야 함. 우리는 graphq tool을이용중이였음 그래서 수정하자
//스키마를 graphql tool을 이용해 합쳐서 보내지 말고 schema 와 resolvers 를 각각 아폴로 서버에보내자
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req, res }) => {
    //console.log(req.headers.authorization);
    return {
      loggedInUser: await getUser(req.headers.authorization),
    };
  },
});

//graphql에는 4가지 파라미터가 존재함. root args context info. context는 apolloServer이 인자로 받아들임.
//context는 어느 resolver에서나 접근 가능한파라미터임. 예를들어 과자를 context에 넣으면 login, editProfile resolver에서 과자를 context에서 꺼낼 수 있다.
//context는 objetc 나 함수가 될수있으며 함수로 설정할 경우 http req,res를 인자로 받는다

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
  );
