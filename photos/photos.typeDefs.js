import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: String!
    user: User!
    file: Upload
    caption: String
    hashtag: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: String!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
