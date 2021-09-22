import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    totalFollowers: Int
    totalFollowing: Int
    isMe: Boolean!
  }
`;

//!는 필수라는 소리

//isFollowing: Boolean! 팔로우를 했는지 안했는지
//isMe: Boolean! 나인지 아닌지 구별
