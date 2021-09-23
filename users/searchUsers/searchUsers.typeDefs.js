import { gql } from "apollo-server-core";

export default gql`
  type query {
    searchUsers(keyword: String!): User
  }
`;
