import { getById, people } from "./db";
const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => getById(id),
  },
};

//쿼리랑 resolvers 가 필요
//playground 는 postman 과 비슷.
export default resolvers;
