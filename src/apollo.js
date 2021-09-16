import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  //캐쉬와 api url 이 필수다
}); //api url 을 넣는다

export default client;
