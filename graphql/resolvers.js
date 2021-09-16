import { getMovies, getMovie, getSuggestions } from "./db";

const resolvers = {
  Query: {
    movies: (_, { rating, limit }) => getMovies(limit, rating),
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
  },
};

export default resolvers;

//쿼리랑 resolvers 가 필요
//playground 는 postman 과 비슷.
//argument 를 전달
//mutation 은 cud를 실행 query는 주로 r read를 실행
