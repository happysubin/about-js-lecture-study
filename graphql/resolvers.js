import { getMovies } from "./db";
const resolvers = {
  Query: {
    movies: (_, { limit, rating }) => getMovies(limit, rating),
  },
};

//쿼리랑 resolvers 가 필요
//playground 는 postman 과 비슷.
//argument 를 전달
//mutation 은 cud를 실행 query는 주로 r read를 실행
export default resolvers;
