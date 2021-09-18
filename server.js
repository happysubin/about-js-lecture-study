import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: "hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (root, { title }, info, context) => {
      console.log(root);
      console.log(info);
      console.log(context);
      console.log(title);
      return true;
    },
    //리졸버와 스키마의 프로퍼티 순서도 아예 같아야한다!
    //createMovie:(root,args,info,context)=>{},
    deleteMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => console.log("Server is run!!!!!!!!!!1"));
