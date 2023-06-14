import { gql } from "apollo-server-core";

export default gql`
  type seeFollowerResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(username: String!, page: Int!): seeFollowerResult
  }
`;
