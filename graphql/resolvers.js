import { getById, getMovies, deleteMovie, addMovie } from "./db";
const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, { id }) => getById(id),
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score),
    deleteMovie: (_, { id }) => deleteMovie(id),
  },
};

//쿼리랑 resolvers 가 필요
//playground 는 postman 과 비슷.
//argument 를 전달
//mutation 은 cud를 실행 query는 주로 r read를 실행
export default resolvers;
