import { gql } from "apollo-server-core";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): EditProfileResult
  }
`;
//전부다 필수적이지 않음. 선택적 요소임
//이제 토큰은 필수적임 내가 누구인지 알려줘야하기 때문임
//그러나 너무 불편해! 수정해보자
