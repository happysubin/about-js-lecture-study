import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      //graphql api에 있는 타입 이름과 같아야한다. Movie타입
      isLiked: () => false,
      //local state를 바꾸려면 mutation 이 필요하다
    },
    Mutation: {
      likeMovie: (_, { id }, { cache }) => {
        cache.modify({
          //이 메소드를 이용해 캐시를 쓸 수 있다.
          id: `Movie:${id}`, //지금 오브젝트 구조가 api의 데이터 구성과 똑같다. 바꿔치려면 똑같아야지!
          fields: {
            isLiked: true, //데이터를 변경!!
            medium_cover_image: "Awesome!!!!!lol", //너도 변경!!!
          },
        });
      },
    },
  },
  //캐쉬와 api url 이 필수다
}); //api url 을 넣는다

export default client;
