import {
  makeExecutableSchema,
  mergeResolvers,
  loadFilesSync,
  mergeTypeDefs,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
//          **/* 모든 폴더를 뜻한다. 모든 폴더안을 확인한다. 파일이름이 뭐든간제 typeDefs.js 로 끝나는파일들을 찾아온다

const loadedResolvers = loadFilesSync(
  `${__dirname}//**/*.{queries,mutation}.js` //패턴 랭귀지 glob
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolver = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolver });

export default schema;
