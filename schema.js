import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
//         **/* 모든 폴더를 뜻한다. 모든 폴더안을 확인한다. 파일이름이 뭐든간제 typeDefs.js 로 끝나는파일들을 찾아온다

const loadedResolvers = loadFilesSync(
  //loadFileSynce 가 export default 를 가져온다
  `${__dirname}/**/*.{queries,mutations}.js` //패턴 랭귀지 glob  **은 모든 폴더 안이라는 뜻 *는 파일을 의미.
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers); //값을 확인

const schema = makeExecutableSchema({ typeDefs, resolvers });

//////////////////////////////
//제일 중요하다 resolvers 다 !!!!!!!이걸로 거의 1시간 30분 잡아먹었다. resolver 이 아닌 resolvers다!!!!!
//!!!!!
export default schema;
